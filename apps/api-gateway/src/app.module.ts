import { Module } from '@nestjs/common';
import { AppConfigModule } from '@shared';
import { configLoaders } from './infrastructure/config';
import { RepositoriesModule } from './infrastructure/repositories';
import { PresentersHttpModule } from './presenters/http/presenters-http.module';

@Module({
  imports: [
    AppConfigModule.forApp('api-gateway', {
      isGlobal: true,
      cache: true,
      load: configLoaders
    }),
    RepositoriesModule.forRoot({
      engines: ['postgres']
    }),
    PresentersHttpModule
  ]
})
export class AppModule {}
