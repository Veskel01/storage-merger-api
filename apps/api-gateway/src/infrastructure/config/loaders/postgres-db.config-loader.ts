import { registerAs } from '@nestjs/config';
import { ConfigLoaderKeys } from 'apps/api-gateway/src/types';

export const postgresDbConfigLoader = registerAs(ConfigLoaderKeys.PostgresDbConfig, () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || ''),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}));
