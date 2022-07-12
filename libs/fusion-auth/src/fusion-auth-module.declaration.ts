import { ConfigurableModuleBuilder } from '@nestjs/common';
import { FusionAuthModuleOptions, IModuleExtras } from './fusion-auth.interfaces';
import { CLASS_METHOD_NAME, DEFAULT_CLIENT_NAME, FACTORY_METHOD_NAME } from './constants';

export const { ASYNC_OPTIONS_TYPE, ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<FusionAuthModuleOptions>()
    .setClassMethodName(CLASS_METHOD_NAME)
    .setFactoryMethodName(FACTORY_METHOD_NAME)
    .setExtras<IModuleExtras>({ clientName: DEFAULT_CLIENT_NAME }, (def) => ({
      ...def,
      global: true
    }))
    .build();
