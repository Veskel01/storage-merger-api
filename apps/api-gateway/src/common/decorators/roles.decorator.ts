import { SetMetadata } from '@nestjs/common';
import { META_ROUTE_ROLES } from '../../constants';
import { IRolesDecoratorMetadata } from '../../types';

export const Roles = (config: IRolesDecoratorMetadata): ReturnType<typeof SetMetadata> =>
  SetMetadata(META_ROUTE_ROLES, config);
