import { Module } from '@nestjs/common';
import { UsersHttpPresenterModule } from './users/users-http-presenter.module';

@Module({
  imports: [UsersHttpPresenterModule]
})
export class PresentersHttpModule {}
