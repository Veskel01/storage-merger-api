import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CqrsService } from './cqrs.service';

@Module({
  imports: [CqrsModule],
  providers: [CqrsService],
  exports: [CqrsService]
})
export class CqrsPublisherModule {}
