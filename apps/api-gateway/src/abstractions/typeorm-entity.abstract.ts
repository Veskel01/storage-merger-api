import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IBaseEntity } from '@shared-types';

export abstract class TypeOrmEntity implements IBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public readonly id: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  public readonly createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  public readonly updatedAt: Date;
}
