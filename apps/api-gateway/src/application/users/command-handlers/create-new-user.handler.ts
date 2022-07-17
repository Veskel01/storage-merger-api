import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CqrsPublisherService } from 'apps/api-gateway/src/cqrs-publisher';
import { CreateNewUserCommand, User } from '../../../domain/users';
import { UsersRepository } from '../ports/users.repository';

@CommandHandler(CreateNewUserCommand)
export class CreateNewUserHandler implements ICommandHandler<CreateNewUserCommand> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly publisher: CqrsPublisherService
  ) {}

  public async execute({ newUserData }: CreateNewUserCommand): Promise<User> {
    const user = this.publisher.getModelWithMergedContext(
      await this.usersRepository.create(newUserData)
    );
    user.handleCreation();
    user.commit();

    return user;
  }
}
