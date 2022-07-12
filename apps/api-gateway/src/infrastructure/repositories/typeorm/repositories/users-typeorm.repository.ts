import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { IUserEntity } from '../../../../domain/users';
import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { DataSource, Repository } from 'typeorm';
import { UsersRepository } from '../../../../application/users';
import { UserEntity } from '../entities/user.entity';

export class UsersTypeOrmRepository
  extends TypeOrmQueryService<UserEntity>
  implements UsersRepository
{
  constructor(
    @InjectRepository(UserEntity) private readonly orm: Repository<UserEntity>,
    @InjectDataSource() private readonly dataSource: DataSource
  ) {
    super(orm);
  }

  public findOne(id: string): Promise<IUserEntity | null> {
    throw new Error('Method not implemented.');
  }

  public find(query?: PaginateQuery | undefined): Promise<Paginated<IUserEntity>> {
    throw new Error('Method not implemented.');
  }

  public create(entityDataToCreate: Partial<IUserEntity>): Promise<IUserEntity> {
    return this.createOne(entityDataToCreate);
  }

  public async bulkCreate(entitiesDataToCreate: Partial<IUserEntity>[]): Promise<IUserEntity[]> {
    const bulkSaveResult = await this.dataSource.transaction((manager) => {
      const entitiesForSave = entitiesDataToCreate.map((data) => this.orm.create(data));
      return manager.save(entitiesForSave);
    });
    return bulkSaveResult;
  }
}
