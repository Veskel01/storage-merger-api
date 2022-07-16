import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AppConfigModule } from '@shared';
import { FusionAuthModule } from '@fusion-auth';
import { FusionAuthConfig } from './config';

@Module({
  imports: [
    AppConfigModule.forApp('auth-service', {
      isGlobal: true,
      cache: true
    }),
    FusionAuthModule.forRootAsync({
      useClass: FusionAuthConfig
    })
  ],
  controllers: [AuthServiceController]
})
export class AuthServiceModule {}
