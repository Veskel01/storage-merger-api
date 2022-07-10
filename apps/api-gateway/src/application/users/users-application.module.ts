import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule]
})
export class UsersApplicationModule {
  public static withInfrastructure(infrastructure: ModuleMetadata['imports']): DynamicModule {
    return {
      module: UsersApplicationModule,
      imports: [...(infrastructure ?? [])]
    };
  }
}
