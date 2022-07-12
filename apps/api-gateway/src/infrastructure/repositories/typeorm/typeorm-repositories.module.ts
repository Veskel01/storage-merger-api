import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../../../application/users';
import { UserEntity } from './entities/user.entity';
import { UsersTypeOrmRepository } from './repositories/users-typeorm.repository';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [{ provide: UsersRepository, useClass: UsersTypeOrmRepository }],
  exports: [UsersRepository]
})
export class TypeOrmRepositoriesModule {}
