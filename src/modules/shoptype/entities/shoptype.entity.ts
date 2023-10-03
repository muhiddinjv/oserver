import {Column, Entity, JoinTable, OneToMany} from "typeorm";
import {Shop} from "../../shop/shop.entity";
import {Model} from "../../common/model.entity";

@Entity('ShopType')
export class Shoptype extends Model{

    @Column()
    name:string;

    @Column({default:1})
    status:number;

    @OneToMany((type)=>Shop,(shop)=>shop.shoptype)
    @JoinTable()
    shop:Shop[]


    constructor(name:string,status:number) {
        super();
        this.name=name;
        this.status=status;
    }
}
