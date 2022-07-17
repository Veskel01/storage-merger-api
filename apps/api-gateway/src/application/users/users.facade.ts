import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { CqrsService } from '../../cqrs-publisher';
import {
  CreateNewUserCommand,
  GetSingleUserQuery,
  GetUsersQuery,
  IUserEntity,
  UpdateUserCommand,
  User
} from '../../domain/users';
import { PageDTO } from '../../shared';

@Injectable()
export class UsersFacade {
  constructor(private readonly cqrsService: CqrsService) {}

  public getSingle(query: GetSingleUserQuery): Observable<User | null> {
    return from(this.cqrsService.publishQuery<User | null>(query));
  }

  public createNewUser(command: CreateNewUserCommand): Observable<User> {
    return from(this.cqrsService.publishCommand<User>(command));
  }

  public updateUser(command: UpdateUserCommand): Observable<User> {
    return from(this.cqrsService.publishCommand<User>(command));
  }

  public getUsers(query: GetUsersQuery): Observable<PageDTO<IUserEntity>> {
    return from(this.cqrsService.publishQuery<PageDTO<IUserEntity>>(query));
  }
}
