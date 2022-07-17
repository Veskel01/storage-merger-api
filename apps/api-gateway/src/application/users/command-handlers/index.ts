import { CommandHandlerType } from '@nestjs/cqrs';
import { CreateNewUserHandler } from './create-new-user.handler';
import { UpdateUserHandler } from './update-user.handler';

export const CommandHandlers: CommandHandlerType[] = [CreateNewUserHandler, UpdateUserHandler];
