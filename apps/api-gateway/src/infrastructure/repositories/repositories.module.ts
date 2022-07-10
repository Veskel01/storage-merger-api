import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDbConfig } from '../config';
import { TypeOrmRepositoriesModule } from './typeorm/typeorm-repositories.module';

type OrmTypes = 'typeorm';

type Engines = 'postgres';

interface IModuleOptions {
  engines: Engines[];
}

@Module({})
export class RepositoriesModule {
  public static forRoot({ engines }: IModuleOptions): DynamicModule {
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

  public static register({ withOrm }: { withOrm: OrmTypes }): DynamicModule {
    let imports: ModuleMetadata['imports'] = [];
    let exports: ModuleMetadata['exports'] = [];

    switch (withOrm) {
      case 'typeorm':
        imports = [TypeOrmRepositoriesModule];
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
