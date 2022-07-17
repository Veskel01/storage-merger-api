import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSingleUserQuery, User } from '../../../domain/users';
import { UsersRepository } from '../ports/users.repository';

@QueryHandler(GetSingleUserQuery)
export class GetSingleUserHandler implements IQueryHandler<GetSingleUserQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ id, idType }: GetSingleUserQuery): Promise<User | null> {
    const user =
      idType === 'auth'
        ? await this.usersRepository.findByAuthId(id)
        : await this.usersRepository.findOneById(id);
    return user;
  }
}
