import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NewUserCreatedEvent } from '../../../domain/users';

// TODO - elasticsearch index

@EventsHandler(NewUserCreatedEvent)
export class NewUserCreatedHandler implements IEventHandler<NewUserCreatedEvent> {
  public handle({ newUserData }: NewUserCreatedEvent): void {
    console.log('event handler', newUserData);
  }
}
