import { BaseRepository } from '../../../shared';
import { IUserEntity } from '../../../domain/users';

export abstract class UsersRepository extends BaseRepository<IUserEntity> {}
