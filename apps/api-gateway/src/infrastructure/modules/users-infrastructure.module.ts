import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories';

@Module({
  imports: [
    RepositoriesModule.register({
      withOrm: 'typeorm',
      forRepositories: ['users-repository']
    })
  ],
  exports: [RepositoriesModule]
})
export class UsersInfrastructureModule {}
