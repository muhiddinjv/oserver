import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import {
  Model,
  Address,
  Clients,
  Shoptype,
  Warehouse,
  Products,
  Categories,
  Brands,
  PriceType,
  ProductPrice,
  Units,
} from '../entities';

@Entity('Shops')
export class Shop extends Model {
  @Column()
  shop_name: string;

  @Column()
  phone: string;

  @OneToMany((type) => Address, (addr) => addr.shops)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToMany((type) => Clients, (client) => client.shop)
  clients: Clients[];

  @Column()
  owner_name: string;

  @ManyToOne((type) => Shoptype, (shoptype) => shoptype.shop)
  @JoinColumn({ name: 'shoptype_id' })
  @JoinTable()
  shoptype: Shoptype;

  @OneToMany((type) => Warehouse, (warehouse) => warehouse.shop, {
    cascade: ['update'],
  })
  warehouse: Warehouse[];

  @OneToMany((type) => Products, (products) => products.shop, {
    cascade: ['update'],
  })
  products: Products[];

  @OneToMany((type) => Categories, (warehouse) => warehouse.shop, {
    cascade: ['update'],
  })
  categories: Categories[];

  @OneToMany((type) => Brands, (brand) => brand.shop, { cascade: ['update'] })
  brand: Brands[];

  @OneToMany((type) => PriceType, (pricetype) => pricetype.shop, {
    cascade: ['update'],
  })
  pricetype: PriceType[];

  @OneToMany((type) => ProductPrice, (productPrice) => productPrice.shop, {
    cascade: ['update'],
  })
  productPrice: ProductPrice[];

  @OneToMany((type) => Units, (unit) => unit.shop)
  units: Units[];

  @Column()
  shop_latitude: string;

  @Column()
  shop_longtitude: string;

  // constructor(shop_name:string,phone:string,address:Address[],owner_name:string,shoptype:Shoptype[],shop_latitude:string,shop_longtitude:string) {
  //     super();
  //     this.shop_name=shop_name;
  //     this.phone=phone;
  //     this.address=address;
  //     this.owner_name=owner_name;
  //     this.shoptype=shoptype;
  //     this.shop_latitude=shop_latitude;
  //     this.shop_longtitude=shop_longtitude;
  // }
}
