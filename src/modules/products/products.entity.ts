import {Column, Entity, ManyToOne, OneToMany, Timestamp} from "typeorm";
import {Model, Shop, Categories, Brands, ProductGroup, ProductPrice, Units} from "../entities";

@Entity('Products')
export class Products extends Model{

    @Column()
    product_sku:number;

    @Column()
    product_qrcode_id:number;

    @Column()
    product_type:number;

    @ManyToOne((type)=>Categories,(shop)=>shop.products,{cascade:['update']})
    categories:Categories;

    @ManyToOne((type)=>ProductGroup,(productgroup)=>productgroup.product,{cascade:['update']})
    productgroup:ProductGroup;

    @ManyToOne((type)=>Brands,(brand)=>brand.product,{cascade:['update']})
    brand:Brands


    @ManyToOne((type)=>Shop,(shop)=>shop.products,{cascade:['update']})
    shop:Shop[]

    @ManyToOne((type)=>ProductPrice,(products)=>products.products,{cascade:['update']})
    productprice:ProductPrice[]

    @ManyToOne((type)=>Units,(unit)=>unit.products,{cascade:['update']})
    unit:Units[]

    @Column()
    product_name: string;

    @Column()
    product_image: string;

    @Column({type:'float'})
    product_cost: number;

    @Column({type:'float'})
    product_price: number;

    @Column({type:'float'})
    product_qty: number;

    @Column({type:'float'})
    product_qty_pack: number;

    @Column({type:'timestamp'})
    product_date_added: Timestamp;

    @Column({type:'timestamp'})
    product_expiration_date: Timestamp;

    @Column()
    product_low_limit:number;

    @Column()
    product_enable_stock:boolean;

    @Column()
    product_status:number;


}