import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CqrsPublisherService } from './cqrs-publisher.service';

@Module({
  imports: [CqrsModule],
  providers: [CqrsPublisherService],
  exports: [CqrsPublisherService]
})
export class CqrsPublisherModule {}
