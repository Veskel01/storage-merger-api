import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus, EventPublisher } from '@nestjs/cqrs';
import { DomainCommand, DomainEvent, DomainQuery } from '../abstractions';

@Injectable()
export class CqrsPublisherService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly _eventPublisher: EventPublisher
  ) {}

  public async publishCommand<T>(command: DomainCommand): Promise<T> {
    return this.commandBus.execute<typeof command, T>(command);
  }

  public publishEvent(event: DomainEvent): void {
    this.eventBus.publish<typeof event>(event);
  }

  public publishQuery<T>(query: DomainQuery): Promise<T> {
    return this.queryBus.execute<typeof query, T>(query);
  }

  public get eventPublisher(): EventPublisher {
    return this._eventPublisher;
  }
}
