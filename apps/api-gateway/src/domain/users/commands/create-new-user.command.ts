import { DomainCommand } from '../../../abstractions';
import { DeepPartial } from '@shared-types';
import { IUserEntity } from '../user.entity';

export class CreateNewUserCommand extends DomainCommand {
  public constructor(public readonly newUserData: DeepPartial<IUserEntity>) {
    super();
  }
}
