import { Request } from 'express';
import { User } from '../../domain/users';

export interface IUserInfo {
  applicationId: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  birthdate: string;
  phone_number: string;
  roles: string[];
  sub: string;
  tid: string;
}

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

export interface IImportedUser {
  authId: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phoneNumber: string;
  roles: string[];
}

export interface IRequestWithImportedUser extends Request {
  user: IImportedUser;
}

export interface IRequestWithUser extends Request {
  user: User;
}
