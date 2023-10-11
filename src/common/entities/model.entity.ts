import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from "class-transformer";
export abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  // @Exclude()
  public id: number;

  // @Column()
  // @Generated("uuid")
  // public uuid: string;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    onUpdate: 'NOW()',
    nullable: true,
  })
  @Exclude()
  updatedAt: Date;
}
