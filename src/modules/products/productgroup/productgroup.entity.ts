import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Model, Shop, Products } from '../../entities';

@Entity('ProductGroup')
export class ProductGroup extends Model {
  @ManyToOne((type) => Shop, (shop) => shop.brand, { cascade: ['update'] })
  shop: Shop[];

  @OneToMany((type) => Products, (product) => product.productgroup, {
    cascade: ['update'],
  })
  product: Products[];

  @Column()
  group_name: string;

  @Column()
  isSctive: boolean;
}
