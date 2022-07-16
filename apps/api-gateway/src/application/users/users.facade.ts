import { Injectable } from '@nestjs/common';
import { CqrsPublisherService } from '../../cqrs-publisher';
import { GetUsersQuery } from '../../domain/users';

@Injectable()
export class UsersFacade {
  constructor(private readonly cqrsPublisherService: CqrsPublisherService) {}

  public getUsers(query: GetUsersQuery) {
    return this.cqrsPublisherService.publishQuery(query);
  }
}
