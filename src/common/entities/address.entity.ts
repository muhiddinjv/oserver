import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users, Shop, Clients } from '../../modules/entities';
import { Model } from './model.entity'

@Entity('Address')
export class Address extends Model {
  @Column()
  latitude: string;

  @Column()
  longtitude: string;

  @Column()
  address: string;

  @Column()
  landmark: string;

  @ManyToOne((type) => Users, (addr) => addr.address, { cascade: ['update'] })
  @JoinColumn({ name: 'user_id' })
  users: Users[];

  @ManyToOne((type) => Shop, (shop) => shop.address)
  @JoinColumn({ name: 'shop_id' })
  shops: Shop;

  @ManyToOne((type) => Clients, (client) => client.address, {
    cascade: ['update'],
  })
  @JoinColumn({ name: 'client_id' })
  clients: Clients;

  // constructor(
  //   address: string,
  //   latitude: string,
  //   longtitude: string,
  //   landmark: string,
  // ) {
  //   super();
  //   this.address = address;
  //   this.latitude = latitude;
  //   this.longtitude = longtitude;
  //   this.landmark = landmark;
  // }
}
