import { Column, Entity, ManyToMany,JoinTable } from 'typeorm';
import { Model, Roles } from '../../entities';

@Entity('Permissions')
export class Permissions extends Model {
  @Column()
  name: string;

  @ManyToMany((type) => Roles, (role) => role.permission, { onDelete: 'CASCADE' })
  role: Roles[];
}
