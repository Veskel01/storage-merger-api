import { IUserEntity } from '../../../../domain/users';
import { TypeOrmEntity } from '../../../../abstractions';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'users'
})
export class UserEntity extends TypeOrmEntity implements IUserEntity {
  @Column('uuid', { name: 'authId', unique: true })
  public authId: string;
  @Column('text', { name: 'email', unique: true, nullable: false })
  public email: string;
  @Column('text', { name: 'first_name' })
  public firstName: string;
  @Column('text', { name: 'last_name' })
  public lastName: string;
  @Column('timestamp with time zone', { name: 'birth_date' })
  public birthDate: Date;
  @Column('text', { name: 'phone_number' })
  phoneNumber: string;
  @Column('text', { array: true, name: 'roles' })
  roles: string[];
}
