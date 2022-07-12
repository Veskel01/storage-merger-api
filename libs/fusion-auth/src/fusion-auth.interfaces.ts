export interface IModuleExtras {
  clientName?: string;
}

export interface IModuleOptions {
  clientName?: string;
  apiKey: string;
  host: string;
  tenantId?: string;
}

export type BaseFusionAuthModuleOptions = Omit<IModuleOptions, 'clientName'>;

export type FusionAuthModuleOptions = Omit<IModuleOptions, 'clientName'> | Array<IModuleOptions>;

export interface IFusionAuthModuleOptionsFactory {
  createFusionAuthModuleOptions(): BaseFusionAuthModuleOptions;
}
