import { Provider } from '@nestjs/common';

export interface IRepositoryProviders {
  postgresProvider: Provider;
}
