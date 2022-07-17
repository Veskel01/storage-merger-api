import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { MetadataGuard } from '../../abstractions';
import { META_ROUTE_ROLES } from '../../constants';
import { IRequestWithImportedUser, IRolesDecoratorMetadata } from '../../types';

@Injectable()
export class RolesGuard extends MetadataGuard {
  constructor(protected readonly reflector: Reflector) {
    super(reflector);
  }

  protected authImplementation(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { roles, checkAll = false } = this.readMetadata<IRolesDecoratorMetadata>({
      context,
      metadataKey: META_ROUTE_ROLES,
      targets: 'all'
    });
    const request = context.switchToHttp().getRequest<IRequestWithImportedUser>();
    if (!request.user) {
      throw this.getInvalidGuardsChainException();
    }
    const { roles: userRoles } = request.user;
    if (checkAll) {
      return this.checkAll(roles, userRoles);
    }
    return this.checkAny(roles, userRoles);
  }
}
