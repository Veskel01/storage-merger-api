import { CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ApplicationException } from '../exceptions';
import { detectPublicRoute } from '../helpers';

export abstract class MetadataGuard implements CanActivate {
  constructor(protected readonly reflector: Reflector) {
    if (!reflector) {
      throw this._getNoRequiredArgsException();
    }
  }

  protected abstract authImplementation(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean>;

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicRoute = detectPublicRoute({
      context,
      reflector: this.reflector
    });
    return isPublicRoute || this.authImplementation(context);
  }

  protected readMetadata<T = unknown>({
    context,
    metadataKey,
    targets
  }: {
    metadataKey: string;
    context: ExecutionContext;
    targets: 'all' | 'class' | 'handler';
  }): T {
    const metadata = this.reflector.getAllAndOverride<T>(
      metadataKey,
      targets === 'all'
        ? [context.getClass(), context.getHandler()]
        : targets === 'handler'
        ? [context.getHandler()]
        : [context.getClass()]
    );
    return metadata || ({} as T);
  }

  protected checkAll<TValue = unknown>(originalArray: TValue[], comparedArray: TValue[]): boolean {
    if (originalArray.length === 0) {
      return true;
    }
    return originalArray.every((originalItem) => comparedArray.includes(originalItem));
  }

  protected checkAny<TValue = unknown>(originalArray: TValue[], comparedArray: TValue[]): boolean {
    if (originalArray.length === 0) {
      return true;
    }
    return originalArray.some((originalItem) => comparedArray.includes(originalItem));
  }

  protected getInvalidGuardsChainException(): ApplicationException {
    return new ApplicationException({
      message: `${this.constructor.name} is in front of auth-guard. Check your guards order.`,
      messageArgs: [this.constructor.name],
      messageFormat: '%s is in front of auth-guard. Check your guards order.',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    });
  }

  private _getNoRequiredArgsException(): Error {
    throw new Error(
      'You must use the super keyword in the constructor of the class that extends AbstractMetadataGuard'
    );
  }
}
