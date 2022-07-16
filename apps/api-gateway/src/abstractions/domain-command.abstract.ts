import { Logger } from '@nestjs/common';

//TODO
export abstract class DomainCommand {
  private readonly _logger: Logger = new Logger(this.constructor.name);

  constructor() {
    this._logCommand();
  }

  private _logCommand(): void {}
}
