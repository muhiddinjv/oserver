import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import {Model, Shop, ProductPrice } from "../entities";

@Entity('PriceType')
export class PriceType extends Model {
  @ManyToOne((type) => Shop, (shop) => shop.pricetype, { cascade: ['update'] })
  shop: Shop[];

  @OneToMany((type) => ProductPrice, (pricetype) => pricetype.priceType, {
    cascade: ['update'],
  })
  productPrice: ProductPrice[];

  @Column()
  pricetype_name: string;

  @Column()
  price_type_active: boolean;
}
