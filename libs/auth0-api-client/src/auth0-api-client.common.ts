import { Inject } from '@nestjs/common';
import { getAuth0ApiClientToken } from './auth0-api-client.utils';

export const InjectAuth0ApiClient = (clientName?: string): ReturnType<typeof Inject> =>
  Inject(getAuth0ApiClientToken(clientName));
