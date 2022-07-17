import { IBaseEntity } from '@shared-types';
import { DomainQuery } from 'apps/api-gateway/src/abstractions';

export class GetSingleUserQuery extends DomainQuery {
  constructor(public readonly id: IBaseEntity['id'], public readonly idType: 'auth' | 'system') {
    super();
  }
}
