import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CqrsService } from 'apps/api-gateway/src/cqrs-publisher';
import { CreateNewUserCommand, User } from '../../../domain/users';
import { UsersRepository } from '../ports/users.repository';

@CommandHandler(CreateNewUserCommand)
export class CreateNewUserHandler implements ICommandHandler<CreateNewUserCommand> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cqrsService: CqrsService
  ) {}

  public async execute({ newUserData }: CreateNewUserCommand): Promise<User> {
    const entity = await this.usersRepository.create(newUserData);
    const user = this.cqrsService.getModelWithMergedContext(new User(entity));
    user.handleCreate();
    user.commit();

    return user;
  }
}
