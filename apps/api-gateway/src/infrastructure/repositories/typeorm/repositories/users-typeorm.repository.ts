import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { IUserEntity } from '../../../../domain/users';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { DataSource, Repository } from 'typeorm';
import { UsersRepository } from '../../../../application/users';
import { UserEntity } from '../entities/user.entity';
import { PageDTO, PageMetaDTO } from '../../../../shared';
import { OrderDirection } from 'apps/api-gateway/src/constants';

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
    return this.orm.findOne({
      where: { id }
    });
  }

  public async find(query: PaginateQuery): Promise<PageDTO<UserEntity>> {
    const { data, meta: searchMeta } = await paginate(query, this.orm, {
      sortableColumns: ['createdAt', 'updatedAt', 'email'],
      searchableColumns: ['createdAt']
    });
    return {
      data,
      meta: new PageMetaDTO({
        itemCount: searchMeta.totalItems,
        options: {
          order: searchMeta.sortBy[0][1] as OrderDirection,
          page: searchMeta.currentPage,
          take: searchMeta.itemsPerPage,
          skip: searchMeta.itemsPerPage
        }
      })
    };
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
