import { Auth0ApiClientModule } from '@auth0-api-clien';
import { Module } from '@nestjs/common';
import { AppConfigModule } from '@shared';
import { AuthServiceController } from './auth-service.controller';
import { Auth0ApiClientConfig } from './config';

@Module({
  imports: [
    AppConfigModule.forApp('auth-service', {
      cache: true,
      isGlobal: true
    }),
    Auth0ApiClientModule.forRootAsync({
      useClass: Auth0ApiClientConfig
    })
  ],
  controllers: [AuthServiceController]
})
export class AuthServiceModule {}
