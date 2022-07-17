import { Module } from '@nestjs/common';
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
  ]
})
export class AuthServiceModule {}
