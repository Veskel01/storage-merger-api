import { IBaseEntity } from '@shared-types';

export interface IUserEntity extends IBaseEntity {
  authId: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phoneNumber: string;
  roles: string[];
}
