import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import * as fse from 'fs-extra';

@Module({})
export class AppConfigModule {
  public static forApp(
    appName: string,
    options: Omit<ConfigModuleOptions, 'envFilePath'> = {}
  ): DynamicModule {
    return {
      module: AppConfigModule,
      imports: [
        ConfigModule.forRoot({
          ...options,
          envFilePath: this._loadEnvFilePaths(appName)
        })
      ],
      providers: [],
      exports: []
    };
  }

  private static _loadEnvFilePaths(appName: string): string[] {
    const basePath = `${process.cwd()}/apps`;
    const globalAppEnvs = `${basePath}/.env`;

    const appPath = `${basePath}/${appName}`;

    const currAppDirFiles = fse.readdirSync(appPath);

    const srcDir = currAppDirFiles.find((file) => file.startsWith('src'));

    let envFiles: string[] = this._scanEnvs(appPath);

    if (srcDir) {
      const srcEnvs = this._scanEnvs(`${appPath}/${srcDir}`);
      envFiles = [...envFiles, ...srcEnvs];
    }

    return [globalAppEnvs, ...envFiles];
  }

  private static _scanEnvs(path: string): string[] {
    const files = fse.readdirSync(path);
    const envFiles = files.filter((file) => file.endsWith('.env'));
    return envFiles.map((file) => `${path}/${file}`);
  }
}
