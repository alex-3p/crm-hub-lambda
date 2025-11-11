import 'server-only';
import { cookies } from 'next/headers';
import type { SessionPayload, User } from './definitions';

const sessionCookieName = 'session';

export async function createSession(payload: { user: User, access: string, refresh: string }) {
  const sessionData: SessionPayload = {
    user: payload.user,
    accessToken: payload.access,
    refreshToken: payload.refresh,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  // In a real app, you'd encrypt this. For now, just stringify.
  const sessionValue = JSON.stringify(sessionData);

  cookies().set(sessionCookieName, sessionValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(sessionData.expiresAt),
    path: '/',
    sameSite: 'lax',
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookie = cookies().get(sessionCookieName);
  if (!cookie?.value) {
    return null;
  }
  
  try {
    // In a real app, you'd decrypt this.
    const sessionData = JSON.parse(cookie.value) as SessionPayload;

    if (Date.now() > sessionData.expiresAt) {
      await deleteSession();
      return null;
    }

    return sessionData;
  } catch (error) {
    console.error("Failed to parse session cookie:", error);
    return null;
  }
}

export async function deleteSession() {
  cookies().delete(sessionCookieName);
}
