import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import { Shop, Model, Address, ClientsGroup } from '../../entities';
import { ClientType } from '../clienttype.enums';

@Entity('Clients')
export class Clients extends Model {
  @ManyToOne((type) => Shop, (shop) => shop.clients, { cascade: ['update'] })
  shop: Shop[];

  @Column()
  client_name: string;

  @Column()
  client_phone: string;

  @OneToMany((type) => Address, (address) => address.clients, {
    cascade: ['update'],
  })
  address: Address;

  @ManyToOne((type) => ClientsGroup, (clgroup) => clgroup.clients, {
    cascade: ['update'],
  })
  clientgroup: ClientsGroup[];

  @Column()
  client_logo: string;

  @Column()
  client_contact_person: string;

  @Column()
  client_tin: string;

  @Column()
  client_account: string;

  @Column()
  client_company_name: string;

  @Column({
    type: 'enum',
    enum: ClientType,
    default: ClientType.CLIENT_INDIVIDUAL,
  })
  client_type: ClientType;

  @Column()
  client_status: boolean;
}
