import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Users, Warehouse, Model } from '../../entities';

@Entity('ProductWarehouse')
export class ProductWarehouse extends Model {
  @ManyToOne((type) => Users, (user) => user.productwarehouses, {
    cascade: ['update'],
  })
  user: Users;

  @ManyToOne((type) => Warehouse, (store) => store.warehose, {
    cascade: ['insert'],
  })
  warehouse: Warehouse;

  @Column()
  qty: number;

  @Column()
  qty_pack: number;
}
