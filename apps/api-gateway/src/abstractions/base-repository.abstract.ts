import { IBaseEntity } from '@shared-types';
import { PaginateQuery } from 'nestjs-paginate';
import { PageDTO } from '../shared';

export abstract class BaseRepository<TEntity extends IBaseEntity> {
  public abstract findOne(id: string): Promise<TEntity | null>;
  public abstract find(query?: PaginateQuery): Promise<PageDTO<TEntity>>;
  public abstract create(entityDataToCreate: Partial<TEntity>): Promise<TEntity>;
  public abstract bulkCreate(entitiesDataToCreate: Partial<TEntity>[]): Promise<TEntity[]>;
}
