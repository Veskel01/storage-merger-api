import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { FUSION_AUTH_STRATEGY_NAME } from '../../constants';

@Injectable()
export class AuthenticationGuard extends AuthGuard(FUSION_AUTH_STRATEGY_NAME) {
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
