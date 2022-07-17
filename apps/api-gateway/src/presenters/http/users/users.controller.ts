import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { PaginationDefaultsPipe } from '../../../common/pipes';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { UsersFacade } from '../../../application/users';
import { GetUsersQuery, IUserEntity, User } from '../../../domain/users';
import { AuthenticationGuard } from '../../../common/guards';
import { UserInfoInterceptor } from '../../../common/interceptors';
import { AuthenticatedUser } from '../../../common/decorators';
import { PageDTO } from '../../../shared';
import { Observable } from 'rxjs';

@Controller('/users')
@UseGuards(AuthenticationGuard)
export class UsersController {
  constructor(private readonly usersFacade: UsersFacade) {}

  @Get('/me')
  @UseInterceptors(UserInfoInterceptor)
  public getAuthenticatedUserInfo(@AuthenticatedUser() user: User) {
    return user.toResource();
  }

  @Get()
  public getUsers(
    @Paginate(PaginationDefaultsPipe) paginateQuery: PaginateQuery
  ): Observable<PageDTO<IUserEntity>> {
    return this.usersFacade.getUsers(new GetUsersQuery(paginateQuery));
  }
}
