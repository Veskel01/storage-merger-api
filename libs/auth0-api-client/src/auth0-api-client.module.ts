import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ManagementClient, ManagementClientOptions } from 'auth0';
import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
  MODULE_OPTIONS_TOKEN
} from './auth0-api-client.declaration';
import { IExtras } from './auth0-api-client.interfaces';
import { getAuth0ApiClientToken } from './auth0-api-client.utils';

@Module({})
export class Auth0ApiClientModule extends ConfigurableModuleClass {
  public static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers: defaultProviders, ...rest } = super.forRoot(options);
    const clientProviders = this._getProviders(options);
    return {
      ...rest,
      providers: [...(defaultProviders || []), ...clientProviders],
      exports: clientProviders
    };
  }

  public static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const { providers: defaultProviders, ...rest } = super.forRootAsync(options);
    const clientProviders = this._getProviders(options);
    return {
      ...rest,
      providers: [...(defaultProviders || []), ...clientProviders],
      exports: clientProviders
    };
  }

  private static _getProviders(
    options: typeof OPTIONS_TYPE | typeof ASYNC_OPTIONS_TYPE
  ): Provider<ManagementClient>[] {
    if (Array.isArray(options)) {
      options.map((option) => {
        if (this._isNotAsyncProvider(option)) {
          return this._createAuth0ApiClientProvider(option);
        }
        return this._createAsyncAuth0ApiClientProvider(option);
      });
    }
    if (this._isNotAsyncProvider(options)) {
      return [this._createAuth0ApiClientProvider(options as ManagementClientOptions & IExtras)];
    }
    return [this._createAsyncAuth0ApiClientProvider(options as typeof ASYNC_OPTIONS_TYPE)];
  }

  private static _createAuth0ApiClientProvider({
    clientName,
    ...auth0Options
  }: ManagementClientOptions & IExtras): Provider<ManagementClient> {
    return {
      provide: getAuth0ApiClientToken(clientName),
      useFactory: (): ManagementClient => new ManagementClient(auth0Options)
    };
  }

  private static _createAsyncAuth0ApiClientProvider(
    option: typeof ASYNC_OPTIONS_TYPE
  ): Provider<ManagementClient> {
    return {
      provide: getAuth0ApiClientToken(option.clientName),
      useFactory: (auth0Options: ManagementClientOptions) => new ManagementClient(auth0Options),
      inject: [MODULE_OPTIONS_TOKEN]
    };
  }

  private static _isNotAsyncProvider(
    options: typeof OPTIONS_TYPE | typeof ASYNC_OPTIONS_TYPE
  ): boolean {
    return 'clientId' in options;
  }
}
