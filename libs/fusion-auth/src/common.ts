import { Inject } from '@nestjs/common';
import { getFusionAuthClientToken } from './utils';

export const InjectFusionAuthClient = (clientName?: string): ReturnType<typeof Inject> =>
  Inject(getFusionAuthClientToken(clientName));
