import 'dotenv/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FusionUserInfoService } from './services/fusion-user-info.service';
import { FusionAuthJwtStrategy } from './strategies/fusion-auth-jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UserInfoService } from '../abstractions';
import {
  AUTH_JWT_STRATEGY_PROVIDER,
  AUTH_JWT_STRATEGY_NAME,
  AUTH_PROVIDERS,
  AUTH_PROVIDER_ENV_VAR
} from '../constants';
import { Strategy } from 'passport-jwt';

@Module({
  imports: [
    HttpModule,
    PassportModule.register({
      defaultStrategy: AUTH_JWT_STRATEGY_NAME
    })
  ],
  providers: [
    {
      provide: AUTH_JWT_STRATEGY_PROVIDER,
      useFactory: (configService: ConfigService, userInfoService: UserInfoService): Strategy => {
        const authProvider = configService.get(AUTH_PROVIDER_ENV_VAR);
        if (authProvider === AUTH_PROVIDERS.fusionAuth) {
          return new FusionAuthJwtStrategy(configService, userInfoService);
        }
        throw new Error(`Unsupported authentication provider: ${authProvider}`);
      },
      inject: [ConfigService, UserInfoService]
    },
    {
      provide: UserInfoService,
      useFactory: (configService: ConfigService, http: HttpService): UserInfoService => {
        const authProvider = configService.get(AUTH_PROVIDER_ENV_VAR);
        if (authProvider === AUTH_PROVIDERS.fusionAuth) {
          return new FusionUserInfoService(configService, http);
        }
        throw new Error(`Unknown auth provider: ${authProvider}`);
      },
      inject: [ConfigService, HttpService]
    }
  ],
  exports: [AUTH_JWT_STRATEGY_PROVIDER, UserInfoService]
})
export class AuthenticationModule {}
