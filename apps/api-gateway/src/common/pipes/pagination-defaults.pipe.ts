import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PaginateQuery } from 'nestjs-paginate';
import { deepCloneObject } from '../../infrastructure/utils';

@Injectable()
export class PaginationDefaultsPipe implements PipeTransform {
  private readonly _defaultPage = 1;
  private readonly _defaultLimit: number = 10;
  private readonly _defaultSortBy: string = 'createdAt';

  public transform(value: unknown, metadata: ArgumentMetadata): PaginateQuery | unknown {
    if (this._isPaginateQuery(value) && metadata.type === 'custom') {
      return this._getPaginateQuery(deepCloneObject(value));
    }
    return value;
  }

  private _isPaginateQuery(value: unknown): value is PaginateQuery {
    return (value as PaginateQuery).path !== undefined;
  }

  private _getPaginateQuery(value: PaginateQuery): PaginateQuery {
    return {
      ...value,
      page: value.page && value.page > 0 ? value.page : this._defaultPage,
      limit: value.limit && value.limit > 0 ? value.limit : this._defaultLimit,
      sortBy: value.sortBy ? value.sortBy : [[this._defaultSortBy, 'ASC']]
    } as PaginateQuery;
  }
}
