import { OrderDirection } from '../../constants';

export class PageOptionsDTO {
  public readonly order: OrderDirection = OrderDirection.ASC;
  public readonly page: number = 1;
  public readonly take: number = 10;
  public get skip(): number {
    return (this.page - 1) * this.take;
  }
}
