import { BaseFusionAuthModuleOptions, IFusionAuthModuleOptionsFactory } from '@fusion-auth';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FusionAuthConfig implements IFusionAuthModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createFusionAuthModuleOptions(): BaseFusionAuthModuleOptions {
    const apiKey = this.configService.get<string>('AUTH_API_KEY', '');
    const host = this.configService.get<string>('AUTH_HOST', '');
    const tenantId = this.configService.get<string>('AUTH_TENANT_ID', '');
    return {
      apiKey,
      host,
      tenantId
    };
  }
}
