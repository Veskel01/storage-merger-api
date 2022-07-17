import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../../../application/users';
import { BaseOrmRepositoryModule } from '../base-orm-repository-module';
import { UserEntity } from './entities/user.entity';
import { UsersTypeOrmRepository } from './users-typeorm.repository';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [{ provide: UsersRepository, useClass: UsersTypeOrmRepository }]
})
export class TypeOrmRepositoriesModule extends BaseOrmRepositoryModule {}
