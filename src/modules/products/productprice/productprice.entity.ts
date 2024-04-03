import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Model, PriceType, Shop, Products } from '../../entities';

@Entity('ProductPrice')
export class ProductPrice extends Model {
  @OneToMany((type) => PriceType, (pricetype) => pricetype.productPrice, {
    cascade: ['update'],
  })
  priceType: PriceType;

  @ManyToOne((type) => Shop, (shop) => shop.productPrice, {
    cascade: ['update'],
  })
  shop: Shop;

  @ManyToOne((type) => Products, (product) => product.productprice, {
    cascade: ['update'],
  })
  products: Products;

  @Column({ type: 'timestamp' })
  price_add_date: Date;

  @Column()
  currency: number;

  @Column()
  currency_symbol: string;

  @Column({ type: 'float' })
  buy_price: number;

  @Column({ type: 'float' })
  sell_price: number;

  @Column()
  price_is_active: boolean;
}
