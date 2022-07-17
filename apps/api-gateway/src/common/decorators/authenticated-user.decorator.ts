import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestWithUser } from '../../types';

export const AuthenticatedUser = createParamDecorator((data: never, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<IRequestWithUser>();
  return request.user;
});
