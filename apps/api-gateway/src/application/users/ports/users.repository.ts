import { BaseRepository } from '../../../abstractions';
import { IUserEntity, User } from '../../../domain/users';

export abstract class UsersRepository extends BaseRepository<IUserEntity, User> {
  public abstract findByAuthId(authId: string): Promise<User | null>;
}
