import { IUserEntity } from '../../../../domain/users';
import { TypeOrmEntity } from '../../../../shared';
import { Entity } from 'typeorm';

@Entity({
  name: 'users'
})
export class UserEntity extends TypeOrmEntity implements IUserEntity {
  public email: string;
}
