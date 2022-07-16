import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as NestExceptionFilter,
  HttpException,
  Logger
} from '@nestjs/common';
import { Stages } from '@shared';
import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { IApplicationExceptionBody } from '../../exceptions';

@Catch(HttpException, Error)
export class ExceptionFilter implements NestExceptionFilter<HttpException | Error> {
  private readonly _logger: Logger = new Logger(ExceptionFilter.name);

  private readonly _defaultErrorMessage = 'Internal Application Error';

  private readonly _defaultStatusCode = 500;

  private readonly _defaultMesssagFormat: string = '';

  private readonly _defaultMessageArgs: string[] = [];

  public catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    let errorResponseBody: IApplicationExceptionBody = {
      statusCode: this._defaultStatusCode,
      message: this._defaultErrorMessage,
      messageArgs: this._defaultMessageArgs,
      messageFormat: this._defaultMesssagFormat
    };

    if (exception instanceof HttpException) {
      const httpStatus = exception.getStatus();
      const errorBody = exception.getResponse() as IApplicationExceptionBody;
      errorResponseBody = {
        ...errorBody,
        statusCode: httpStatus
      };
    } else if (exception instanceof Error) {
      this._logger.error(exception.message, exception?.stack);
      errorResponseBody.message = exception.message;
    }

    const { statusCode, ...rest } = errorResponseBody;
    response.status(statusCode).send({
      statusCode,
      ...rest,
      timestamp: DateTime.now().toLocal().toJSDate(),
      ...(Stages.isDevelopment ? { path: request.url } : {})
    });
  }
}
