import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FUSION_AUTH_STRATEGY_NAME } from '../constants';
import { FusionAuthStrategy } from './strategies/fusion-auth.strategy';

@Module({
  imports: [
    HttpModule,
    PassportModule.register({
      defaultStrategy: FUSION_AUTH_STRATEGY_NAME
    })
  ],
  providers: [FusionAuthStrategy],
  exports: [FusionAuthStrategy]
})
export class AuthenticationModule {}
