import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IRegisterRepositoryOptions, IRepositoriesModuleOptions } from '../../types';
import { PostgresDbConfig } from '../config';
import { RepositoriesList } from './repositories.list';
import { TypeOrmRepositoriesModule } from './typeorm/typeorm-repositories.module';

@Module({})
export class RepositoriesModule {
  public static forRoot({ engines }: IRepositoriesModuleOptions): DynamicModule {
    const imports: ModuleMetadata['imports'] = [];
    engines.forEach((engine) => {
      switch (engine) {
        case 'postgres':
          imports.push(
            TypeOrmModule.forRootAsync({
              useClass: PostgresDbConfig
            })
          );
          break;
      }
    });
    return {
      module: RepositoriesModule,
      imports
    };
  }

  public static register({
    withOrm,
    forRepositories
  }: IRegisterRepositoryOptions<keyof typeof RepositoriesList>): DynamicModule {
    let imports: ModuleMetadata['imports'] = [];
    let exports: ModuleMetadata['exports'] = [];

    switch (withOrm) {
      case 'typeorm':
        imports = [TypeOrmRepositoriesModule.withRepositories(forRepositories)];
        exports = [TypeOrmRepositoriesModule];
        break;
    }
    return {
      module: RepositoriesModule,
      imports,
      exports
    };
  }
}
