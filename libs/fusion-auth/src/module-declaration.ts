import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ConfigNames, DEFAULT_CLIENT_NAME } from './constants';
import { FusionAuthModuleOptions, IModuleExtras } from './interfaces';

export const { ASYNC_OPTIONS_TYPE, ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<FusionAuthModuleOptions>()
    .setClassMethodName(ConfigNames.Class_method_name)
    .setFactoryMethodName(ConfigNames.Factory_method_name)
    .setExtras<IModuleExtras>(
      {
        clientName: DEFAULT_CLIENT_NAME
      },
      (def) => ({
        ...def,
        global: true
      })
    )
    .build();
