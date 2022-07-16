import { DynamicModule, Module, Provider } from '@nestjs/common';
import { FusionAuthClient } from '@fusionauth/typescript-client';
import { IModuleOptions } from './interfaces';
import {
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN
} from './module-declaration';
import { getFusionAuthClientToken } from './utils';

@Module({})
export class FusionAuthModule extends ConfigurableModuleClass {
  public static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers: defaultProviders } = super.forRoot(options);
    const clientProviders = this._generateProviders(options);
    return {
      ...super.forRoot(options),
      providers: [...(defaultProviders || []), ...clientProviders],
      exports: clientProviders
    };
  }

  public static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const { providers: defaultProviders } = super.forRootAsync(options);
    const clientProviders = this._generateProviders(options);
    return {
      ...super.forRootAsync(options),
      providers: [...(defaultProviders || []), ...clientProviders],
      exports: clientProviders
    };
  }

  private static _generateProviders(
    options: typeof OPTIONS_TYPE | typeof ASYNC_OPTIONS_TYPE
  ): Provider<FusionAuthClient>[] {
    if (Array.isArray(options)) {
      return options.map((option) => {
        if (this._isNotAsyncOption(option)) {
          return this._createFusionAuthClientProvider(option);
        }
        return this._createAsyncFusionAuthClientProvider(option);
      });
    }
    if (this._isNotAsyncOption(options)) {
      return [this._createFusionAuthClientProvider(options as IModuleOptions)];
    }
    return [this._createAsyncFusionAuthClientProvider(options)];
  }

  private static _isNotAsyncOption(
    options: typeof OPTIONS_TYPE | typeof ASYNC_OPTIONS_TYPE
  ): boolean {
    return 'apiKey' in options;
  }

  private static _createFusionAuthClientProvider(
    options: IModuleOptions
  ): Provider<FusionAuthClient> {
    return {
      provide: getFusionAuthClientToken(options.clientName),
      useFactory: (): FusionAuthClient => {
        const { apiKey, host, tenantId } = options;
        return new FusionAuthClient(apiKey, host, tenantId);
      }
    };
  }

  private static _createAsyncFusionAuthClientProvider(
    options: typeof ASYNC_OPTIONS_TYPE
  ): Provider<FusionAuthClient> {
    return {
      provide: getFusionAuthClientToken(options.clientName),
      useFactory: ({ apiKey, host, tenantId }: IModuleOptions): FusionAuthClient => {
        return new FusionAuthClient(apiKey, host, tenantId);
      },
      inject: [MODULE_OPTIONS_TOKEN]
    };
  }
}
