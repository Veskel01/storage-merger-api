import { IBaseEntity } from '@shared-types';
import { PageMetaDTO } from './page-meta.dto';

export class PageDTO<T extends IBaseEntity> {
  public readonly data: T[];
  public readonly meta: PageMetaDTO;

  constructor(data: T[], meta: PageMetaDTO) {
    this.data = data;
    this.meta = meta;
  }
}
