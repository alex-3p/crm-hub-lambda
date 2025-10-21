export type User = {
  id: number;
  email: string;
  full_name: string;
  role: string;
};

export type SessionPayload = {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};
