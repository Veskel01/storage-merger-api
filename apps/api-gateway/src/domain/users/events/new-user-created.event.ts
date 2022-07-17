import { DomainEvent } from '../../../abstractions';
import { IUserEntity } from '../user.entity';

export class NewUserCreatedEvent extends DomainEvent {
  constructor(public readonly newUserData: IUserEntity) {
    super();
  }
}
