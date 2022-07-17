import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { PaginationDefaultsPipe } from '../../../common/pipes';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { UsersFacade } from '../../../application/users';
import { GetUsersQuery, User, UserDTO } from '../../../domain/users';
import { UserInfoInterceptor } from '../../../common/interceptors';
import { AuthenticatedUser } from '../../../common/decorators';
import { PageDTO } from '../../../shared';
import { map, Observable } from 'rxjs';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersFacade: UsersFacade) {}

  @Get('/me')
  @UseInterceptors(UserInfoInterceptor)
  public getAuthenticatedUserInfo(@AuthenticatedUser() user: User): UserDTO {
    return user.toResource();
  }

  @Get()
  public getUsers(
    @Paginate(PaginationDefaultsPipe) paginateQuery: PaginateQuery
  ): Observable<PageDTO<UserDTO>> {
    return this.usersFacade.getUsers(new GetUsersQuery(paginateQuery)).pipe(
      map((pageDto) => {
        return {
          ...pageDto,
          data: pageDto.data.map((user) => user.toResource())
        };
      })
    );
  }
}
