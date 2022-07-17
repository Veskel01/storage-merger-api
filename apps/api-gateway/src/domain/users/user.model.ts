import { BaseDomainModel } from '../../abstractions';
import { NewUserCreatedEvent } from './events';
import { IUserEntity } from './user.entity';

export class User extends BaseDomainModel<IUserEntity> {
  protected shapeModelState(): Readonly<IUserEntity> {
    return {
      id: '',
      authId: '',
      createdAt: new Date(),
      email: '',
      updatedAt: new Date(),
      firstName: '',
      lastName: '',
      birthDate: new Date(),
      phoneNumber: '',
      roles: []
    };
  }

  public handleCreation(): void {
    this.apply(new NewUserCreatedEvent(this.getState()));
  }
}
