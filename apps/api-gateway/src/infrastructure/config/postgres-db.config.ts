import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Stages } from '@shared';
import { ConfigLoaderKeys } from '../../types';
import { postgresDbConfigLoader } from './loaders/postgres-db.config-loader';

@Injectable()
export class PostgresDbConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbConfig = this.configService.get<ConfigType<typeof postgresDbConfigLoader>>(
      ConfigLoaderKeys.PostgresDbConfig
    );
    return {
      type: 'postgres',
      ...dbConfig,
      autoLoadEntities: true,
      synchronize: Stages.isDevelopmentOrStaging
    };
  }
}
