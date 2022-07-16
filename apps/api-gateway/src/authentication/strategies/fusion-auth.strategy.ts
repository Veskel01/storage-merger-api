import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { FUSION_AUTH_STRATEGY_NAME } from '../../constants';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { IAccessTokenBody } from '../../types';

@Injectable()
export class FusionAuthStrategy extends PassportStrategy(Strategy, FUSION_AUTH_STRATEGY_NAME) {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: `${configService.get('AUTH_ISSUER_URL')}/.well-known/jwks.json`
      }),
      issuer: configService.get('AUTH_ISSUER'),
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256']
    });
  }

  // TODO rabbit
  public async validate(request: Request, payload: IAccessTokenBody) {
    console.log(payload);

    return payload;
  }
}
