import { EventHandlerType } from '@nestjs/cqrs';
import { NewUserCreatedHandler } from './new-user-created.handler';

export const EventHandlers: EventHandlerType[] = [NewUserCreatedHandler];
