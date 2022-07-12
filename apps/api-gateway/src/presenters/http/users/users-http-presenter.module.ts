import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../../../infrastructure/repositories';
import { UsersApplicationModule } from '../../../application/users';
import { UsersController } from './users.controller';

@Module({
  imports: [
    UsersApplicationModule.withInfrastructure([RepositoriesModule.register({ withOrm: 'typeorm' })])
  ],
  controllers: [UsersController]
})
export class UsersHttpPresenterModule {}
