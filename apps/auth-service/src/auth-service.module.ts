import { FusionAuthModule } from '@fusion-auth';
import { Module } from '@nestjs/common';
import { AppConfigModule } from '@shared';
import { AuthServiceController } from './auth-service.controller';
import { FusionAuthConfig } from './config';

@Module({
  imports: [
    AppConfigModule.forApp('auth-service', {
      cache: true,
      isGlobal: true
    }),
    FusionAuthModule.forRootAsync({
      useClass: FusionAuthConfig
    })
  ],
  controllers: [AuthServiceController]
})
export class AuthServiceModule {}
