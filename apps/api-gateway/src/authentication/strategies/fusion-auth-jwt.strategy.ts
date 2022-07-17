import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AUTH_DOMAIN_ENV_VAR, AUTH_ISSUER_ENV_VAR, AUTH_JWT_STRATEGY_NAME } from '../../constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { passportJwtSecret } from 'jwks-rsa';
import { UserInfoService } from '../../abstractions';
import { extractBearerToken } from '../../helpers';
import { firstValueFrom } from 'rxjs';
import { IImportedUser } from '../../types';

export class FusionAuthJwtStrategy extends PassportStrategy(Strategy, AUTH_JWT_STRATEGY_NAME) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userInfoService: UserInfoService
  ) {
    const authDomain = configService.get(AUTH_DOMAIN_ENV_VAR);
    const issuer = configService.get(AUTH_ISSUER_ENV_VAR);

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: false,
        rateLimit: true,
        jwksRequestsPerMinute: 15,
        jwksUri: `${authDomain}/.well-known/jwks.json`
      }),
      issuer,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256']
    });
  }

  public async validate(request: Request): Promise<IImportedUser> {
    const accessToken = extractBearerToken(request);
    const importedUser = await firstValueFrom(
      this.userInfoService.getUserInfo(accessToken as string)
    );
    return importedUser;
  }
}
