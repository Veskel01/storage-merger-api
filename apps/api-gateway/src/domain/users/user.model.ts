import { BaseDomainModel } from '../../abstractions';
import { NewUserCreatedEvent } from './events';
import { UserDTO } from './user.dto';

export class User extends BaseDomainModel<UserDTO> {
  protected shapeModelState(): Readonly<UserDTO> {
    return {
      id: '',
      createdAt: new Date(),
      email: '',
      updatedAt: new Date(),
      firstName: '',
      lastName: '',
      birthDate: new Date(),
      phoneNumber: '',
      roles: [],
      fullName: ''
    };
  }

  public handleCreation(): void {
    this.apply(new NewUserCreatedEvent(this.getState()));
  }
}
