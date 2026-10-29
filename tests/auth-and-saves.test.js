import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { generateKeyPair, SignJWT, createLocalJWKSet, exportJWK } from 'jose';
import { AuthenticationError, verifyAccessToken } from '../api/auth/accessToken.js';
import { createSavedBundleHandler } from '../api/routes/savedBundles.js';
import worker from '../api/worker.js';

const config = { AUTH0_DOMAIN: 'test.us.auth0.com', AUTH0_AUDIENCE: 'https://myhelp-api', AUTH0_CLIENT_ID: 'myhelp-client' };
const { privateKey, publicKey } = await generateKeyPair('RS256');
const jwks = createLocalJWKSet({ keys: [{ ...await exportJWK(publicKey), kid: 'test-key', alg: 'RS256' }] });
async function token(overrides = {}) {
  return new SignJWT({ azp: config.AUTH0_CLIENT_ID, scope: 'read:saved_bundles write:saved_bundles', ...overrides })
    .setProtectedHeader({ alg: 'RS256', kid: 'test-key' }).setIssuer(`https://${config.AUTH0_DOMAIN}/`)
    .setAudience(config.AUTH0_AUDIENCE).setSubject('auth0|alice').setIssuedAt().setExpirationTime('5m').sign(privateKey);
}

test('valid API access token is verified', async () => {
  const user = await verifyAccessToken(await token(), config, jwks);
  assert.equal(user.subject, 'auth0|alice');
  assert.equal(user.scopes.has('write:saved_bundles'), true);
});
test('wrong issuer, audience, application, signature and expiry are rejected', async () => {
  const valid = await token();
  for (const env of [{ ...config, AUTH0_DOMAIN: 'other.us.auth0.com' }, { ...config, AUTH0_AUDIENCE: 'other' }, { ...config, AUTH0_CLIENT_ID: 'other' }]) {
    await assert.rejects(verifyAccessToken(valid, env, jwks), error => error.status === 401);
  }
  const expired = await new SignJWT({ azp: config.AUTH0_CLIENT_ID }).setProtectedHeader({ alg: 'RS256', kid: 'test-key' })
    .setIssuer(`https://${config.AUTH0_DOMAIN}/`).setAudience(config.AUTH0_AUDIENCE).setSubject('auth0|alice')
    .setIssuedAt().setExpirationTime(1).sign(privateKey);
  await assert.rejects(verifyAccessToken(expired, config, jwks), error => error.status === 401);
  const { privateKey: wrong } = await generateKeyPair('RS256');
  const forged = await new SignJWT({ azp: config.AUTH0_CLIENT_ID }).setProtectedHeader({ alg: 'RS256', kid: 'test-key' })
    .setIssuer(`https://${config.AUTH0_DOMAIN}/`).setAudience(config.AUTH0_AUDIENCE).setSubject('auth0|alice')
    .setIssuedAt().setExpirationTime('5m').sign(wrong);
  await assert.rejects(verifyAccessToken(forged, config, jwks), error => error.status === 401);
});
test('ID tokens, malformed scopes, missing configuration and unsigned tokens fail closed', async () => {
  const idToken = await new SignJWT({ azp: config.AUTH0_CLIENT_ID }).setProtectedHeader({ alg: 'RS256', kid: 'test-key' })
    .setIssuer(`https://${config.AUTH0_DOMAIN}/`).setAudience(config.AUTH0_CLIENT_ID).setSubject('auth0|alice')
    .setIssuedAt().setExpirationTime('5m').sign(privateKey);
  await assert.rejects(verifyAccessToken(idToken, config, jwks), error => error.status === 401);
  await assert.rejects(verifyAccessToken(await token({ scope: 5 }), config, jwks), error => error.status === 401);
  await assert.rejects(verifyAccessToken(await token(), {}, jwks), error => error.status === 503);
  await assert.rejects(verifyAccessToken('eyJhbGciOiJub25lIn0.eyJzdWIiOiJhbGljZSJ9.', config, jwks), error => error.status === 401);
});

function database() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('../api/migrations/001_create_core_tables.sql', import.meta.url), 'utf8'));
  sqlite.exec(readFileSync(new URL('../api/migrations/003_saved_bundles.sql', import.meta.url), 'utf8'));
  const seed = sqlite.prepare(`INSERT INTO resources (id,type,slug,title,status,body_text,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)`);
  for (const [id, type, status] of [['verse', 'scripture', 'published'], ['prayer', 'prayer', 'published'], ['draft', 'song', 'draft']]) {
    seed.run(id, type, id, `Title ${id}`, status, 'Trusted content', '2026-01-01', '2026-01-01');
  }
  return { sqlite, DB: { prepare(sql) {
    const statement = sqlite.prepare(sql);
    let params = [];
    return { bind(...values) { params = values; return this; },
      async first() { return statement.get(...params) ?? null; },
      async all() { return { results: statement.all(...params) }; },
      async run() { const result = statement.run(...params); return { meta: { changes: result.changes } }; }
    };
  } } };
}
const handler = createSavedBundleHandler(async request => {
  const identity = request.headers.get('X-Test-User');
  if (!identity) throw new AuthenticationError('Please sign in.');
  return { subject: identity, scopes: new Set((request.headers.get('X-Test-Scopes') ?? 'read:saved_bundles write:saved_bundles').split(' ')) };
});
function request(path = '', { user = 'alice', method = 'GET', body, scopes } = {}) {
  return new Request(`https://test.example/api/saved-bundles${path}`, { method,
    headers: { ...(user ? { 'X-Test-User': user } : {}), ...(scopes ? { 'X-Test-Scopes': scopes } : {}), 'Content-Type': 'application/json' },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}) });
}
const saveBody = { sourceId: 'moment-1', resourceIds: { scripture: ['verse'], prayer: ['prayer'] } };

test('saving snapshots published resources, deduplicates retries, and ignores supplied ownership/content', async () => {
  const db = database();
  const response = await handler(request('', { method: 'POST', body: { ...saveBody, user_subject: 'bob', bundle: { scripture: 'forged' } } }), db);
  assert.equal(response.status, 201);
  const { item } = await response.json();
  const repeat = await handler(request('', { method: 'POST', body: saveBody }), db);
  assert.equal(repeat.status, 200);
  assert.equal((await repeat.json()).item.id, item.id);
  const detail = await handler(request(`/${item.id}`), db);
  assert.equal(detail.headers.get('Cache-Control'), 'no-store');
  assert.equal((await detail.json()).item.bundle.scripture[0].body_text, 'Trusted content');
  assert.equal(db.sqlite.prepare('SELECT user_subject FROM saved_bundles').get().user_subject, 'alice');
});
test('another account cannot list, fetch or delete a saved bundle', async () => {
  const db = database();
  const { item } = await (await handler(request('', { method: 'POST', body: saveBody }), db)).json();
  assert.deepEqual((await (await handler(request('', { user: 'bob' }), db)).json()).items, []);
  assert.equal((await handler(request(`/${item.id}`, { user: 'bob' }), db)).status, 404);
  assert.equal((await handler(request(`/${item.id}`, { user: 'bob', method: 'DELETE' }), db)).status, 404);
  assert.equal((await handler(request(`/${item.id}`), db)).status, 200);
  assert.equal((await handler(request(`/${item.id}`, { method: 'DELETE' }), db)).status, 200);
  assert.equal((await handler(request(`/${item.id}`), db)).status, 404);
});
test('guest, insufficient scope, draft resources, wrong resource types and oversized requests rejected', async () => {
  const db = database();
  assert.equal((await handler(request('', { user: null }), db)).status, 401);
  assert.equal((await handler(request('', { method: 'POST', body: saveBody, scopes: 'read:saved_bundles' }), db)).status, 403);
  for (const resourceIds of [{ song: ['draft'] }, { prayer: ['verse'] }, {}, { scripture: ['missing'] }, { scripture: 'verse' }]) {
    assert.equal((await handler(request('', { method: 'POST', body: { sourceId: 'moment', resourceIds } }), db)).status, 400);
  }
  assert.equal((await handler(request('', { method: 'POST', body: { ...saveBody, padding: 'x'.repeat(17000) } }), db)).status, 413);
});
test('pagination includes older saved moments without duplicates', async () => {
  const db = database();
  for (let i = 0; i < 23; i++) await handler(request('', { method: 'POST', body: { ...saveBody, sourceId: `moment-${i}` } }), db);
  const page1 = await (await handler(request(), db)).json();
  const page2 = await (await handler(request(`?before=${page1.nextCursor}`), db)).json();
  assert.equal(page1.items.length, 20); assert.equal(page2.items.length, 3); assert.equal(page2.nextCursor, null);
  assert.equal(new Set([...page1.items, ...page2.items].map(item => item.id)).size, 23);
});
test('production worker protects saved routes and allows authorization preflight', async () => {
  assert.equal((await worker.fetch(new Request('https://test.example/api/saved-bundles'), config)).status, 401);
  const response = await worker.fetch(new Request('https://test.example/api/saved-bundles', { method: 'OPTIONS' }), config);
  assert.equal(response.status, 204);
  assert.match(response.headers.get('Access-Control-Allow-Headers'), /Authorization/);
  assert.match(response.headers.get('Access-Control-Allow-Methods'), /DELETE/);
  assert.match(response.headers.get('Access-Control-Allow-Methods'), /PATCH/);
});

test('explicit names persist and separate requests may share the same name', async () => {
  const db = database();
  const first = await (await handler(request('', { method: 'POST', body: { ...saveBody, title: 'Sad' } }), db)).json();
  const second = await (await handler(request('', { method: 'POST', body: { ...saveBody, sourceId: 'moment-2', title: 'Sad' } }), db)).json();
  assert.equal(first.item.title, 'Sad'); assert.equal(second.item.title, 'Sad');
  assert.notEqual(first.item.id, second.item.id);
});
test('renaming changes only the name and is restricted to the owner and write scope', async () => {
  const db = database();
  const { item } = await (await handler(request('', { method: 'POST', body: { ...saveBody, title: 'Sad' } }), db)).json();
  const before = db.sqlite.prepare('SELECT bundle_json, created_at FROM saved_bundles WHERE id = ?').get(item.id);
  assert.equal((await handler(request(`/${item.id}`, { user: 'bob', method: 'PATCH', body: { title: 'Forged rename' } }), db)).status, 404);
  assert.equal((await handler(request(`/${item.id}`, { method: 'PATCH', scopes: 'read:saved_bundles', body: { title: 'Missing scope' } }), db)).status, 403);
  const renamed = await handler(request(`/${item.id}`, { method: 'PATCH', body: { title: '  Sad - morning comfort  ' } }), db);
  assert.equal(renamed.status, 200); assert.equal((await renamed.json()).item.title, 'Sad - morning comfort');
  const detail = await (await handler(request(`/${item.id}`), db)).json();
  assert.equal(detail.item.title, 'Sad - morning comfort');
  assert.deepEqual(db.sqlite.prepare('SELECT bundle_json, created_at FROM saved_bundles WHERE id = ?').get(item.id), before);
  assert.equal((await (await handler(request(), db)).json()).items[0].title, 'Sad - morning comfort');
});
test('save and rename reject blank, non-text, excessive and multiline names', async () => {
  const db = database();
  const { item } = await (await handler(request('', { method: 'POST', body: { ...saveBody, title: 'Sad' } }), db)).json();
  for (const title of ['', '   ', null, 12, 'x'.repeat(121), 'two\nlines']) {
    assert.equal((await handler(request('', { method: 'POST', body: { ...saveBody, sourceId: 'invalid', title } }), db)).status, 400);
    assert.equal((await handler(request(`/${item.id}`, { method: 'PATCH', body: { title } }), db)).status, 400);
  }
});
