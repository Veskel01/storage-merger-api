import { DeepPartial, IBaseEntity } from '@shared-types';
import { PaginateQuery } from 'nestjs-paginate';
import { PageDTO } from '../shared';

export abstract class BaseRepository<TEntity extends IBaseEntity> {
  public abstract findOneById(id: string): Promise<TEntity | null>;
  public abstract find(query?: PaginateQuery): Promise<PageDTO<TEntity>>;
  public abstract create(entityDataToCreate: DeepPartial<TEntity>): Promise<TEntity>;
  public abstract bulkCreate(entitiesDataToCreate: DeepPartial<TEntity>[]): Promise<TEntity[]>;
  public abstract updateSingle(id: string, dataToUpdate: DeepPartial<TEntity>): Promise<TEntity>;
}
