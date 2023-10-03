import { Column, Entity, OneToMany } from 'typeorm';
import { Clients, Model } from '../../entities';

@Entity('ClientsGroup')
export class ClientsGroup extends Model {

  @Column()
  client_group_name: string;

  @Column()
  client_group_status: boolean;

  @OneToMany((type) => Clients, (client) => client.clientgroup, {
    cascade: ['update'],
  })
  clients: Clients[];
}
