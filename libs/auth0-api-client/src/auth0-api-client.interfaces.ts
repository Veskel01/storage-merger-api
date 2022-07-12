import { RequireField } from '@shared-types';
import { ManagementClientOptions } from 'auth0';

export interface IExtras {
  clientName?: string;
}

type ApiClientOptions = RequireField<ManagementClientOptions, 'clientSecret' | 'clientId'>;

export type Auth0ApiClientModuleOptions = ApiClientOptions | Array<ApiClientOptions & IExtras>;

export interface IAuth0ApiClientModuleOptionsFactory {
  createAuth0ApiClientModuleOptions(): Auth0ApiClientModuleOptions;
}
