import { InjectRepository } from '@nestjs/typeorm';
import { IUserEntity } from 'apps/api-gateway/src/domain/users';
import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { UsersRepository } from '../../../application/users';
import { UserEntity } from './entities/user.entity';

export class UsersTypeOrmRepository implements UsersRepository {
  constructor(@InjectRepository(UserEntity) private readonly orm: Repository<UserEntity>) {}

  public findOne(id: string): Promise<IUserEntity | null> {
    throw new Error('Method not implemented.');
  }
  public find(query?: PaginateQuery | undefined): Promise<Paginated<IUserEntity>> {
    throw new Error('Method not implemented.');
  }
  public create(entity: Partial<IUserEntity>): Promise<IUserEntity> {
    throw new Error('Method not implemented.');
  }
  public bulkCreate(entities: Partial<IUserEntity>[]): Promise<IUserEntity[]> {
    throw new Error('Method not implemented.');
  }
}
