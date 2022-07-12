import { Inject } from '@nestjs/common';
import { getFusionAuthClientToken } from './fusion-auth.utils';

export const InjectFusionAuthClient = (clientName?: string): ReturnType<typeof Inject> =>
  Inject(getFusionAuthClientToken(clientName));
