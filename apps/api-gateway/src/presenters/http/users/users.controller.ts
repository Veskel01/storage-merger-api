import { Controller, Get, UseGuards } from '@nestjs/common';
import { PaginationDefaultsPipe } from '../../../common/pipes';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { UsersFacade } from '../../../application/users';
import { GetUsersQuery } from '../../../domain/users';
import { AuthenticationGuard } from 'apps/api-gateway/src/common/guards';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersFacade: UsersFacade) {}

  @Get()
  @UseGuards(AuthenticationGuard)
  public async getUsers(@Paginate(PaginationDefaultsPipe) paginateQuery: PaginateQuery) {
    return this.usersFacade.getUsers(new GetUsersQuery(paginateQuery));
  }
}
