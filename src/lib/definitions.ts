export type User = {
  id: number;
  email: string;
  full_name: string;
  role: string;
};

export type Organization = {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
};

export type DomusCredential = {
    id: number;
    crm_token: string;
    inventory_token: string;
    api_base: string;
    crm_base: string;
    inmobiliaria: number;
    grupo: string;
    requiere_grupo: boolean;
};


export type SessionPayload = {
  user: User;
  slug: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};
