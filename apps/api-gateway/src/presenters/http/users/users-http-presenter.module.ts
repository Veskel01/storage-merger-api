import { Module } from '@nestjs/common';
import { UsersApplicationModule } from '../../../application/users';
import { UsersController } from './users.controller';
import { AuthenticationModule } from '../../../authentication';
import { UsersInfrastructureModule } from '../../../infrastructure/modules';

@Module({
  imports: [
    AuthenticationModule,
    UsersApplicationModule.withInfrastructure([UsersInfrastructureModule])
  ],
  controllers: [UsersController]
})
export class UsersHttpPresenterModule {}
