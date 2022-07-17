import { DeepPartial } from '@shared-types';
import { DomainCommand } from '../../../abstractions';
import { IUserEntity } from '../user.entity';

export class UpdateUserCommand extends DomainCommand {
  constructor(
    public readonly id: string,
    public readonly dataToUpdate: DeepPartial<Omit<IUserEntity, 'id'>>
  ) {
    super();
  }
}
