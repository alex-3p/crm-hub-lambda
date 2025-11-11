import 'server-only';
import { cookies } from 'next/headers';
import type { SessionPayload, User } from './definitions';

const sessionCookieName = 'session';

// In a real app, you'd use a library like 'iron-session' to encrypt the cookie.
// For this example, we'll just use base64 encoding for simplicity.
async function encrypt(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

async function decrypt(input: string): Promise<SessionPayload | null> {
  try {
    const sessionData = JSON.parse(Buffer.from(input, 'base64').toString('utf-8'));
     // Basic validation
    if (sessionData && sessionData.expiresAt && sessionData.user) {
        return sessionData;
    }
    return null;
  } catch (error) {
    console.error('Failed to decrypt session cookie:', error);
    return null;
  }
}

export async function createSession(payload: { user: User, access: string, refresh: string }) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const sessionData: SessionPayload = {
    user: payload.user,
    accessToken: payload.access,
    refreshToken: payload.refresh,
    expiresAt: expiresAt.getTime(),
  };

  const encryptedSession = await encrypt(sessionData);

  cookies().set(sessionCookieName, encryptedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    path: '/',
    sameSite: 'lax',
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookie = cookies().get(sessionCookieName)?.value;
  if (!cookie) {
    return null;
  }
  
  const sessionData = await decrypt(cookie);

  if (!sessionData || Date.now() > sessionData.expiresAt) {
    // Session is expired or invalid, delete cookie
    if (sessionData) await deleteSession(); 
    return null;
  }

  return sessionData;
}

export async function deleteSession() {
  cookies().delete(sessionCookieName);
}
