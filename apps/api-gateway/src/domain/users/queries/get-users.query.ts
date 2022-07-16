import { PaginateQuery } from 'nestjs-paginate';
import { DomainQuery } from '../../../abstractions';

export class GetUsersQuery extends DomainQuery {
  constructor(public readonly paginateQuery: PaginateQuery) {
    super();
  }
}
