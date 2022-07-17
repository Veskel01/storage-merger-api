import { DynamicModule, Provider, Type } from '@nestjs/common';
import { MODULE_METADATA_KEYS } from '../../constants';
import { RepositoriesList } from './repositories.list';

export class BaseOrmRepositoryModule {
  public static withRepositories(
    repositoryTokensList: Array<keyof typeof RepositoriesList> | 'all'
  ): DynamicModule {
    const repositoriesToInject =
      repositoryTokensList === 'all'
        ? Object.values(RepositoriesList)
        : Object.keys(RepositoriesList)
            .filter((key) => repositoryTokensList.includes(key as keyof typeof RepositoriesList))
            .map((key) => RepositoriesList[key as keyof typeof RepositoriesList]);

    const moduleProviders = Reflect.getMetadata(
      MODULE_METADATA_KEYS.providersKey,
      this
    ) as Array<Provider>;

    const repositoriesToExport = moduleProviders.filter((provider) => {
      const typedProvider = provider as Provider & { provide: Type };
      return repositoriesToInject.includes(typedProvider.provide);
    });

    return {
      module: this,
      exports: repositoriesToExport
    };
  }
}
