import { IBaseEntity } from '@shared-types';
import { Paginated, PaginateQuery } from 'nestjs-paginate';

export abstract class BaseRepository<TEntity extends IBaseEntity> {
  public abstract findOne(id: string): Promise<TEntity | null>;
  public abstract find(query?: PaginateQuery): Promise<Paginated<TEntity>>;
  public abstract create(entityDataToCreate: Partial<TEntity>): Promise<TEntity>;
  public abstract bulkCreate(entitiesDataToCreate: Partial<TEntity>[]): Promise<TEntity[]>;
}
