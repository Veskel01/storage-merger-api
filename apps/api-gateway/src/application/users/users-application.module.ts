import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { CqrsPublisherModule } from '../../cqrs-publisher';
import { QueryHandlers } from './query-handlers';
import { UsersFacade } from './users.facade';

@Module({
  imports: [CqrsPublisherModule],
  providers: [UsersFacade, ...QueryHandlers],
  exports: [UsersFacade]
})
export class UsersApplicationModule {
  public static withInfrastructure(infrastructure: ModuleMetadata['imports']): DynamicModule {
    return {
      module: UsersApplicationModule,
      imports: [...(infrastructure ?? [])]
    };
  }
}
