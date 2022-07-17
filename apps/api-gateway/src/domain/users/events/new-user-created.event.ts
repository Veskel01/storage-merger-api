import { DomainEvent } from '../../../abstractions';
import { UserDTO } from '../user.dto';

export class NewUserCreatedEvent extends DomainEvent {
  constructor(public readonly newUserData: UserDTO) {
    super();
  }
}
