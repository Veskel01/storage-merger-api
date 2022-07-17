import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PageDTO } from '../../../shared';
import { GetUsersQuery, User } from '../../../domain/users';
import { UsersRepository } from '../ports/users.repository';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ paginateQuery }: GetUsersQuery): Promise<PageDTO<User>> {
    const paginationResult = await this.usersRepository.find(paginateQuery);
    return paginationResult;
  }
}
