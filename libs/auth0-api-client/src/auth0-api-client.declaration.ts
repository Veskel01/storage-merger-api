import { ConfigurableModuleBuilder } from '@nestjs/common';
import { Auth0ApiClientModuleOptions, IExtras } from './auth0-api-client.interfaces';
import { DEFAULT_CLIENT_NAME } from './constants';

export const { ASYNC_OPTIONS_TYPE, ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<Auth0ApiClientModuleOptions>()
    .setClassMethodName('forRoot')
    .setFactoryMethodName('createAuth0ApiClientModuleOptions')
    .setExtras<IExtras>({ clientName: DEFAULT_CLIENT_NAME }, (def) => ({
      ...def,
      global: true
    }))
    .build();
