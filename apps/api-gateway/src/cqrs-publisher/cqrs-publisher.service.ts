import { Injectable, Type } from '@nestjs/common';
import { CommandBus, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { BaseDomainModel, DomainCommand, DomainEvent, DomainQuery } from '../abstractions';

@Injectable()
export class CqrsPublisherService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly eventPublisher: EventPublisher
  ) {}

  public publishCommand<T>(command: DomainCommand): Promise<T> {
    return this.commandBus.execute<typeof command, T>(command);
  }

  public publishEvent(event: DomainEvent): void {
    this.eventBus.publish<typeof event>(event);
  }

  public publishQuery<T>(query: DomainQuery): Promise<T> {
    return this.queryBus.execute<typeof query, T>(query);
  }

  public getModelClassWithMergedContext<T extends BaseDomainModel>(model: Type<T>): Type<T> {
    return this.eventPublisher.mergeClassContext(model);
  }

  public getModelWithMergedContext<T extends BaseDomainModel>(model: T): T {
    return this.eventPublisher.mergeObjectContext(model);
  }
}
