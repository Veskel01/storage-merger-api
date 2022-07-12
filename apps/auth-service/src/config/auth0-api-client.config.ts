import { Auth0ApiClientModuleOptions, IAuth0ApiClientModuleOptionsFactory } from '@auth0-api-clien';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Auth0ApiClientConfig implements IAuth0ApiClientModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createAuth0ApiClientModuleOptions(): Auth0ApiClientModuleOptions {
    const domain = this.configService.get<string>('AUTH_DOMAIN', '');
    const clientId = this.configService.get<string>('AUTH_CLIENT_ID', '');
    const clientSecret = this.configService.get<string>('AUTH_CLIENT_SECRET', '');
    const audience = this.configService.get<string>('AUTH_AUDIENCE', '');
    return {
      domain,
      clientId,
      clientSecret,
      audience,
      retry: {
        enabled: true,
        maxRetries: 2
      },
      tokenProvider: {
        enableCache: true,
        cacheTTLInSeconds: 3600
      }
    };
  }
}
