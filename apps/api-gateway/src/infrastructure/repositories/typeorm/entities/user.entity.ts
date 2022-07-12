import { IUserEntity } from '../../../../domain/users';
import { TypeOrmEntity } from '../../../../shared';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'users'
})
export class UserEntity extends TypeOrmEntity implements IUserEntity {
  @Column('text', { name: 'email', unique: true, nullable: false })
  public email: string;
}
