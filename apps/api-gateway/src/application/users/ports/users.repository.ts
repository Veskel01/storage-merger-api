import { BaseRepository } from '../../../abstractions';
import { IUserEntity } from '../../../domain/users';

export abstract class UsersRepository extends BaseRepository<IUserEntity> {}
