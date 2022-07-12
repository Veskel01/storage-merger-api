import { DEFAULT_CLIENT_NAME } from './constants';

export const getAuth0ApiClientToken = (clientName: string = DEFAULT_CLIENT_NAME): string =>
  `${clientName}Auth0ApiClient`;
