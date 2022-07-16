import { PageOptionsDTO } from './page-options.dto';

interface IPageMetaDtoParameters {
  options: PageOptionsDTO;
  itemCount: number;
}

export class PageMetaDTO {
  public readonly currentPage: number;
  public readonly pageCount: number;
  public readonly take: number;
  public readonly itemCount: number;
  public readonly hasPreviousPage: boolean;
  public readonly hasNextPage: boolean;

  constructor({ itemCount, options }: IPageMetaDtoParameters) {
    this.currentPage = options.page;
    this.take = options.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.currentPage > 1;
    this.hasNextPage = this.currentPage < this.pageCount;
  }
}
