import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand, User } from '../../../domain/users';
import { UsersRepository } from '../ports/users.repository';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ id, dataToUpdate }: UpdateUserCommand): Promise<User> {
    const user = await this.usersRepository.updateSingle(id, dataToUpdate);
    return user;
  }
}
