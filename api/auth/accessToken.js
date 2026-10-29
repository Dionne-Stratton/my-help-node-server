import { createRemoteJWKSet, errors, jwtVerify } from 'jose';

const keySets = new Map();

export class AuthenticationError extends Error {
  constructor(message, status = 401) {
    super(message);
    this.status = status;
  }
}

export async function verifyAccessToken(token, env, testKeySet) {
  const { AUTH0_DOMAIN: domain, AUTH0_AUDIENCE: audience, AUTH0_CLIENT_ID: clientId } = env;
  if (!domain || !audience || !clientId || !/^[a-z0-9.-]+$/.test(domain)) {
    throw new AuthenticationError('Account access is temporarily unavailable.', 503);
  }
  const issuer = `https://${domain}/`;
  if (!testKeySet && !keySets.has(issuer)) {
    keySets.set(issuer, createRemoteJWKSet(new URL(`${issuer}.well-known/jwks.json`)));
  }
  try {
    const { payload } = await jwtVerify(token, testKeySet ?? keySets.get(issuer), {
      issuer, audience, algorithms: ['RS256'], requiredClaims: ['exp', 'iat', 'sub'],
    });
    if (typeof payload.sub !== 'string' || !payload.sub || payload.sub.length > 255 || payload.azp !== clientId || (payload.scope != null && typeof payload.scope !== 'string')) {
      throw new AuthenticationError('Please sign in again.');
    }
    return { subject: payload.sub, scopes: new Set((payload.scope ?? '').split(' ')) };
  } catch (error) {
    if (error instanceof AuthenticationError) throw error;
    if (error instanceof errors.JWKSTimeout || !(error instanceof errors.JOSEError)) {
      throw new AuthenticationError('Account access is temporarily unavailable.', 503);
    }
    throw new AuthenticationError('Please sign in again.');
  }
}

export async function authenticate(request, env) {
  const authorization = request.headers.get('Authorization') ?? '';
  const match = /^Bearer ([^\s]+)$/.exec(authorization);
  if (!match) throw new AuthenticationError('Please sign in to access your saved bundles.');
  return verifyAccessToken(match[1], env);
}
