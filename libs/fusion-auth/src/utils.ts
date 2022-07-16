import { DEFAULT_CLIENT_NAME } from './constants';

export const getFusionAuthClientToken = (clientName: string = DEFAULT_CLIENT_NAME): string =>
  `fusion-auth-client:${clientName}`;
