import { AggregateRoot } from '@nestjs/cqrs';
import { IBaseEntity } from '@shared-types';
import { deepCloneObject } from '../infrastructure/utils';

interface IToResourceArgs<T extends IBaseEntity> {
  keys: Array<keyof T>;
  type: 'removeGivenKeys' | 'onlyGivenKeys';
}

export abstract class BaseDomainModel<TEntity extends IBaseEntity> extends AggregateRoot {
  protected abstract state: Readonly<TEntity>;

  constructor(data?: Partial<TEntity>) {
    super();
    if (data) {
      this.setProperties(data);
    }
  }

  public getProperties(): TEntity {
    return this.state;
  }

  public setProperties(data: Partial<TEntity>): void {
    Object.assign(this.state, data);
  }

  public toResource<TResource extends TEntity>({
    keys,
    type
  }: IToResourceArgs<TEntity>): TResource {
    if (keys.length === 0) {
      return this.getProperties() as TResource;
    }

    const entityData = deepCloneObject<TEntity>(this.getProperties());

    if (type === 'removeGivenKeys') {
      const removeResult = {} as TResource;
      Object.entries(entityData)
        .filter(([key]) => !keys.includes(key as keyof TEntity))
        .forEach(([key, value]) => {
          removeResult[key as keyof TEntity] = value;
        });

      return removeResult;
    }

    return keys.reduce((acc, key) => {
      acc[key as keyof TResource] = entityData[key] as unknown as TResource[keyof TResource];

      return acc;
    }, {} as TResource);
  }
}
