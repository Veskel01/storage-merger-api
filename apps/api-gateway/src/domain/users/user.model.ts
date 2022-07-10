import { DateTime } from 'luxon';
import { BaseDomainModel } from '../../shared';
import { IUserEntity } from './user.entity';

export class User extends BaseDomainModel<IUserEntity> {
  protected state: Readonly<IUserEntity> = {
    id: '',
    createdAt: DateTime.now().toLocal().toJSDate(),
    email: '',
    updatedAt: DateTime.now().toLocal().toJSDate()
  };
}
