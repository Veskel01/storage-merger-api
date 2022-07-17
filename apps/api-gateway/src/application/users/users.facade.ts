import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { CqrsPublisherService } from '../../cqrs-publisher';
import {
  CreateNewUserCommand,
  GetSingleUserQuery,
  GetUsersQuery,
  UpdateUserCommand,
  User
} from '../../domain/users';
import { PageDTO } from '../../shared';

@Injectable()
export class UsersFacade {
  constructor(private readonly publisher: CqrsPublisherService) {}

  public getSingleUser(query: GetSingleUserQuery): Observable<User | null> {
    return from(this.publisher.publishQuery<User | null>(query));
  }

  public createNewUser(command: CreateNewUserCommand): Observable<User> {
    return from(this.publisher.publishCommand<User>(command));
  }

  public updateUser(command: UpdateUserCommand): Observable<User> {
    return from(this.publisher.publishCommand<User>(command));
  }

  public getUsers(query: GetUsersQuery): Observable<PageDTO<User>> {
    return from(this.publisher.publishQuery<PageDTO<User>>(query));
  }
}
