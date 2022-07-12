import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Stages } from '@shared';
import { AppGlobals } from './app.globals';
import { AppModule } from './app.module';
import { API_PORT_ENV_VAR, API_PREFIX, API_VERSION } from './constants';

async function bootstrap(): Promise<void> {
  const logger = new Logger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: Stages.isProductionOrStaging ? ['log'] : ['debug', 'log', 'warn', 'error'],
    cors: true
  });

  const configService = app.get(ConfigService);

  app.enableShutdownHooks();
  app.setGlobalPrefix(API_PREFIX);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: API_VERSION,
    prefix: 'v'
  });

  const { globalFilters, globalGuards, globalInterceptors, globalPipes } = new AppGlobals(app);

  app.useGlobalGuards(...globalGuards);
  app.useGlobalFilters(...globalFilters);
  app.useGlobalInterceptors(...globalInterceptors);
  app.useGlobalPipes(...globalPipes);

  const port = configService.get(API_PORT_ENV_VAR, 5000);

  await app.listen(port, () => {
    logger.log(`API Gateway listening on port ${port}`);
  });
}
bootstrap();
