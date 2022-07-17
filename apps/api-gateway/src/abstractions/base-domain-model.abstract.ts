import { AggregateRoot } from '@nestjs/cqrs';
import { DeepPartial, IBaseEntity } from '@shared-types';
import { deepCloneObject } from '../infrastructure/utils';

interface IToResourceArgs<T extends IBaseEntity> {
  keys: Array<keyof T>;
  type: 'removeGivenKeys' | 'onlyGivenKeys';
}

export abstract class BaseDomainModel<
  TEntity extends IBaseEntity = IBaseEntity
> extends AggregateRoot {
  private _state: Readonly<TEntity>;

  protected abstract shapeModelState(): Readonly<TEntity>;

  constructor(data?: DeepPartial<TEntity>) {
    super();
    this._state = this.shapeModelState();
    if (data) {
      this.setState(data);
    }
  }

  public getState(): Readonly<TEntity> {
    return this._state;
  }

  public setState(data: DeepPartial<TEntity>): void {
    this._state = {
      ...this._state,
      ...data
    };
  }

  public toResource<TResource extends TEntity>(
    { keys, type }: IToResourceArgs<TEntity> = {
      keys: [],
      type: 'onlyGivenKeys'
    }
  ): TResource {
    if (keys.length === 0) {
      return this.getState() as TResource;
    }

    const entityData = deepCloneObject<TEntity>(this.getState());

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
