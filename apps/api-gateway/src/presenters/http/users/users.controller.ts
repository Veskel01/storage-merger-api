import { Controller } from '@nestjs/common';
import { UsersRepository } from '../../../application/users';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersRepo: UsersRepository) {}
}
