import { Request } from 'express';

export const extractBearerToken = (request: Request): string | null => {
  const { headers } = request;
  if (headers.authorization && headers.authorization.startsWith('Bearer')) {
    return headers.authorization.split(' ')[1];
  }
  return null;
};
