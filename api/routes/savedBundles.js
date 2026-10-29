import { authenticate, AuthenticationError } from '../auth/accessToken.js';

const slots = ['scripture', 'prayer', 'reflection', 'song'];
const headers = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};
const reply = (data, status = 200) => new Response(JSON.stringify(data), { status, headers });

async function readBody(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new AuthenticationError('A request body is required.', 400);
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 16384) {
      await reader.cancel();
      throw new AuthenticationError('The save request is too large.', 413);
    }
    chunks.push(value);
  }
  try {
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    const data = JSON.parse(new TextDecoder().decode(bytes));
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error();
    return data;
  } catch { throw new AuthenticationError('Request body must be a JSON object.', 400); }
}

// Dependency injection is only used by tests; production always validates Auth0 tokens.
export function createSavedBundleHandler(verifyUser = authenticate) {
  return async function savedBundleRoutes(request, env) {
    try {
      const user = await verifyUser(request, env);
      const requiredScope = request.method === 'GET' ? 'read:saved_bundles' : 'write:saved_bundles';
      if (!user.scopes.has(requiredScope)) return reply({ error: 'Your account does not have access to this action.' }, 403);
      const url = new URL(request.url);
      const id = url.pathname.match(/^\/api\/saved-bundles\/([a-zA-Z0-9-]+)$/)?.[1];
      const isCollection = url.pathname === '/api/saved-bundles';
      if (!isCollection && !id) return reply({ error: 'Not found.' }, 404);

      if (isCollection && request.method === 'GET') {
        const before = url.searchParams.get('before');
        if (before && !/^[1-9][0-9]{0,14}$/.test(before)) return reply({ error: 'Invalid page.' }, 400);
        const result = await env.DB.prepare(`
          SELECT rowid AS cursor, id, title, created_at FROM saved_bundles
          WHERE user_subject = ? AND rowid < ? ORDER BY rowid DESC LIMIT 21
        `).bind(user.subject, before ? Number(before) : Number.MAX_SAFE_INTEGER).all();
        const rows = result.results ?? [];
        const items = rows.slice(0, 20).map(({ id, title, created_at }) => ({ id, title, createdAt: created_at }));
        return reply({ items, nextCursor: rows.length > 20 ? String(rows[19].cursor) : null });
      }

      if (id && request.method === 'GET') {
        const row = await env.DB.prepare(`SELECT id, title, bundle_json, created_at FROM saved_bundles WHERE id = ? AND user_subject = ?`)
          .bind(id, user.subject).first();
        if (!row) return reply({ error: 'Saved bundle not found.' }, 404);
        return reply({ item: { id: row.id, title: row.title, bundle: JSON.parse(row.bundle_json), createdAt: row.created_at } });
      }

      if (id && request.method === 'DELETE') {
        const result = await env.DB.prepare('DELETE FROM saved_bundles WHERE id = ? AND user_subject = ?').bind(id, user.subject).run();
        return result.meta.changes ? reply({ success: true }) : reply({ error: 'Saved bundle not found.' }, 404);
      }

      if (isCollection && request.method === 'POST') {
        const body = await readBody(request);
        if (typeof body.sourceId !== 'string' || !/^[a-zA-Z0-9-]{1,64}$/.test(body.sourceId)) {
          return reply({ error: 'A valid source ID is required.' }, 400);
        }
        if (!body.resourceIds || typeof body.resourceIds !== 'object' || Array.isArray(body.resourceIds)) {
          return reply({ error: 'Bundle resources are required.' }, 400);
        }
        const bundle = {};
        let count = 0;
        for (const slot of slots) {
          const ids = body.resourceIds[slot] ?? [];
          if (!Array.isArray(ids) || ids.length > 12 || ids.some(id => typeof id !== 'string' || !id || id.length > 128)) {
            return reply({ error: 'Invalid bundle resources.' }, 400);
          }
          bundle[slot] = [];
          for (const resourceId of [...new Set(ids)]) {
            const resource = await env.DB.prepare('SELECT * FROM resources WHERE id = ? AND type = ? AND status = ?')
              .bind(resourceId, slot, 'published').first();
            if (!resource) return reply({ error: 'One of these resources is no longer available to save.' }, 400);
            // Build the snapshot from trusted published resources, never browser-provided content.
            bundle[slot].push(resource);
            count++;
          }
        }
        if (!count) return reply({ error: 'This bundle is empty.' }, 400);
        const title = typeof body.title === 'string' && body.title.trim()
          ? body.title.trim().slice(0, 120) : (bundle.scripture[0]?.title ?? 'A saved moment').slice(0, 120);
        const savedId = crypto.randomUUID();
        await env.DB.prepare(`INSERT INTO saved_bundles (id, user_subject, source_id, title, bundle_json, created_at)
          VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(user_subject, source_id) DO NOTHING`)
          .bind(savedId, user.subject, body.sourceId, title, JSON.stringify(bundle), new Date().toISOString()).run();
        const item = await env.DB.prepare('SELECT id, title, created_at FROM saved_bundles WHERE user_subject = ? AND source_id = ?')
          .bind(user.subject, body.sourceId).first();
        return reply({ item: { id: item.id, title: item.title, createdAt: item.created_at } }, item.id === savedId ? 201 : 200);
      }
      return reply({ error: 'Method not allowed.' }, 405);
    } catch (error) {
      if (error instanceof AuthenticationError) return reply({ error: error.message }, error.status);
      // Never log request bodies or tokens: saved bundles can be personal.
      console.error('Saved bundle operation failed.');
      return reply({ error: 'Unable to access saved bundles right now.' }, 500);
    }
  };
}
export const savedBundleRoutes = createSavedBundleHandler();
