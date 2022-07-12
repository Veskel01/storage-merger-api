import { HttpException, HttpStatus } from '@nestjs/common';

export interface IApplicationExceptionBody {
  statusCode: HttpStatus;
  message: string;
  messageFormat: string;
  messageArgs: string[];
}

export class ApplicationException extends HttpException {
  constructor(args: IApplicationExceptionBody) {
    super(args, args.statusCode);
  }

  public get statusCode(): number {
    return this.getStatus();
  }

  public get messageFormat(): string {
    const { messageFormat } = super.getResponse() as IApplicationExceptionBody;

    return messageFormat;
  }

  public get messageArgs(): string[] {
    const { messageArgs } = super.getResponse() as IApplicationExceptionBody;

    return messageArgs;
  }
}
