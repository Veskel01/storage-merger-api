import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AUTH_JWT_STRATEGY_NAME } from '../../constants';
import { detectPublicRoute } from '../../helpers';

@Injectable()
export class AuthenticationGuard extends AuthGuard(AUTH_JWT_STRATEGY_NAME) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicRoute = detectPublicRoute({
      context,
      reflector: this.reflector
    });
    return isPublicRoute || super.canActivate(context);
  }
}
