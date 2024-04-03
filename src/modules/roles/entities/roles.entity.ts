import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Model, Users, Permissions } from '../../entities';

@Entity('Roles')
export class Roles extends Model {
  @Column()
    role_name:string;

    @Column()
    role_title:string;

    @ManyToMany(type => Users, user => user.roles)
    users: Users[];


    @ManyToMany((type) => Permissions, (permission) => permission.role)
    @JoinTable({ name: 'RoleHasPermission' })
    permission: Permissions[];
}
