import {
  CanActivate,
  ExceptionFilter as NestExceptionFilter,
  NestInterceptor,
  PipeTransform
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Stages } from '@shared';
import { ExceptionFilter } from './common/filters';
import { AuthenticationGuard } from './common/guards';
import { LoggingInterceptor } from './common/interceptors';

export class AppGlobals {
  private readonly _reflector: Reflector;

  constructor(private readonly _app: NestExpressApplication) {
    this._reflector = _app.get(Reflector);
  }

  public get globalFilters(): NestExceptionFilter[] {
    const exceptionFilter = new ExceptionFilter();
    return [exceptionFilter];
  }

  public get globalGuards(): CanActivate[] {
    const authGuard = new AuthenticationGuard(this._reflector);
    return [authGuard];
  }

  public get globalPipes(): PipeTransform[] {
    return [];
  }

  public get globalInterceptors(): NestInterceptor[] {
    const defaultInterceptors: NestInterceptor[] = [];
    return Stages.isDevelopment
      ? [...defaultInterceptors, new LoggingInterceptor()]
      : defaultInterceptors;
  }
}
