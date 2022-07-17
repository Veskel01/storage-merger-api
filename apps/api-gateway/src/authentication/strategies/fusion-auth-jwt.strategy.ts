import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AUTH_DOMAIN_ENV_VAR, AUTH_ISSUER_ENV_VAR, AUTH_JWT_STRATEGY_NAME } from '../../constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { passportJwtSecret } from 'jwks-rsa';
import { UserInfoService } from '../../abstractions';
import { extractBearerToken } from '../../helpers';
import { firstValueFrom, switchMap } from 'rxjs';
import { UsersRepository } from '../../application/users';
import { User } from '../../domain/users';

export class FusionAuthJwtStrategy extends PassportStrategy(Strategy, AUTH_JWT_STRATEGY_NAME) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userInfoService: UserInfoService,
    private readonly usersRepository: UsersRepository
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

  public async validate(request: Request): Promise<User> {
    const accessToken = extractBearerToken(request);
    const user = await firstValueFrom(
      this.userInfoService
        .getUserInfo(accessToken as string)
        .pipe(switchMap((importedUser) => this.usersRepository.findByAuthId(importedUser.authId)))
    );
    return user ? user : new User();
  }
}
