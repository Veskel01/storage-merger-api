import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { IUserEntity, User, UserDTO } from '../../../domain/users';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { DataSource, Repository } from 'typeorm';
import { UsersRepository } from '../../../application/users';
import { UserEntity } from './entities/user.entity';
import { PageDTO, PageMetaDTO } from '../../../shared';
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

  public async findOneById(id: string): Promise<User | null> {
    const entity = await this.orm.findOne({
      where: { id }
    });
    return entity ? new User(UserDTO.fromEntity(entity)) : null;
  }

  public async findByAuthId(authId: string): Promise<User | null> {
    const entity = await this.orm.findOne({
      where: {
        authId
      }
    });
    return entity ? new User(UserDTO.fromEntity(entity)) : null;
  }

  public async find(query: PaginateQuery): Promise<PageDTO<User>> {
    const { data: entities, meta: searchMeta } = await paginate(query, this.orm, {
      sortableColumns: ['createdAt', 'updatedAt', 'email'],
      searchableColumns: ['createdAt']
    });
    return {
      data: entities.map((entity) => new User(UserDTO.fromEntity(entity))),
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

  public async create(entityDataToCreate: Partial<IUserEntity>): Promise<User> {
    const entity = await this.createOne(entityDataToCreate);
    return new User(UserDTO.fromEntity(entity));
  }

  public async updateSingle(id: string, dataToUpdate: Partial<IUserEntity>): Promise<User> {
    const updatedEntity = await this.updateOne(id, dataToUpdate);
    return new User(UserDTO.fromEntity(updatedEntity));
  }

  public async bulkCreate(entitiesDataToCreate: Partial<IUserEntity>[]): Promise<User[]> {
    const bulkSaveResult = await this.dataSource.transaction((manager) => {
      const entitiesForSave = entitiesDataToCreate.map((data) => this.orm.create(data));
      return manager.save(entitiesForSave);
    });
    return bulkSaveResult.map((entity) => new User(UserDTO.fromEntity(entity)));
  }
}
