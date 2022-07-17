import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { META_UNPROTECTED_ROUTE } from '../constants';

interface IArgs {
  reflector: Reflector;
  context: ExecutionContext;
}

export const detectPublicRoute = ({ reflector, context }: IArgs): boolean => {
  const isPublicRoute = reflector.getAllAndOverride<boolean>(META_UNPROTECTED_ROUTE, [
    context.getClass(),
    context.getHandler()
  ]);
  return !!isPublicRoute;
};
