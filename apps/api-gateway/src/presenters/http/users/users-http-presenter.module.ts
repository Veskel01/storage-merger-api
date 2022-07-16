import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../../../infrastructure/repositories';
import { UsersApplicationModule } from '../../../application/users';
import { UsersController } from './users.controller';
import { AuthenticationModule } from '../../../authentication';

@Module({
  imports: [
    AuthenticationModule,
    UsersApplicationModule.withInfrastructure([RepositoriesModule.register({ withOrm: 'typeorm' })])
  ],
  controllers: [UsersController]
})
export class UsersHttpPresenterModule {}
