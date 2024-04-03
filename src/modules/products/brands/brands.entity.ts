import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Model, Shop, Products } from '../../entities';

@Entity('Brands')
export class Brands extends Model {
  @ManyToOne((type) => Shop, (shop) => shop.brand, { cascade: ['update'] })
  shop: Shop[];

  @Column()
  brand_name: string;

  @Column()
  brand_image: string;

  @Column()
  brand_status: boolean;

  constructor(
    shop: Shop[],
    brand_name: string,
    brand_image: string,
    brand_status: boolean,
  ) {
    super();
    this.shop = shop;
    this.brand_name = brand_name;
    this.brand_image = brand_image;
    this.brand_status = brand_status;
  }

  @OneToMany((type) => Products, (product) => product.brand, {
    cascade: ['update'],
  })
  product: Products[];
}
