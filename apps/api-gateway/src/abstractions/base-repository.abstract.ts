import { DeepPartial, IBaseEntity } from '@shared-types';
import { PaginateQuery } from 'nestjs-paginate';
import { PageDTO } from '../shared';
import { BaseDomainModel } from './domain/base-domain-model.abstract';

export abstract class BaseRepository<TEntity extends IBaseEntity, TModel extends BaseDomainModel> {
  public abstract findOneById(id: string): Promise<TModel | null>;
  public abstract find(query?: PaginateQuery): Promise<PageDTO<TModel>>;
  public abstract create(entityDataToCreate: DeepPartial<IBaseEntity>): Promise<TModel>;
  public abstract bulkCreate(entitiesDataToCreate: DeepPartial<TEntity>[]): Promise<TModel[]>;
  public abstract updateSingle(id: string, dataToUpdate: DeepPartial<TEntity>): Promise<TModel>;
}
