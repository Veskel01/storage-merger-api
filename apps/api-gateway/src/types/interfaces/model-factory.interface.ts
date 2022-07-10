import { AggregateRoot } from '@nestjs/cqrs';
import { IBaseEntity } from '@shared-types';

export interface IModelFactory<TEntity extends IBaseEntity, TModel extends AggregateRoot> {
  create(entity: TEntity): TModel;
}
