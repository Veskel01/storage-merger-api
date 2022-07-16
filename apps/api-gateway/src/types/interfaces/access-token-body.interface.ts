export interface IAccessTokenBody {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  jti: string;
  authenticationType: string;
  email: string;
  email_verified: boolean;
  preferred_username: string;
  auth_time: number;
  tid: string;
}
