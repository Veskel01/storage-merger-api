import { SetMetadata } from '@nestjs/common';
import { META_UNPROTECTED_ROUTE } from '../../constants';

export const PublicRoute = (): ReturnType<typeof SetMetadata> =>
  SetMetadata(META_UNPROTECTED_ROUTE, true);
