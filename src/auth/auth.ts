export type AuthRequest = {
  authToken: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshRequest = {
  refreshToken: string;
};

export type Token = {
  sub: string;
  exp: number | Date;
};
