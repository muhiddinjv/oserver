import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {Shop, Model, Products} from "../entities";

@Entity("Units")
export class Units extends Model{

    @Column()
    unit_name:string;

    @Column()
    short_name:string;

    @Column()
    base_unit:number;

    @Column()
    operator:string;

    @Column({type:"float"})
    operator_value:number;

    @Column()
    is_active:boolean;

    @ManyToOne((type)=>Shop,(unit)=>unit.units)
    shop:Shop[]

    @OneToMany((type)=>Products,(unit)=>unit.unit)
    products:Products[]
}
