import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import {District} from "./districts.entity";
import {Users} from "../users/entities/users.entity";
import {Model} from "../common/model.entity";

@Entity('Regions')
export class Regions extends Model {
  @Column()
  name: string;

  @OneToMany((type) => District, (district) => district.region)
  district: District[];


  @OneToMany((type)=>Users,(user)=>user.region)
  user: Users[];

  public toString(): string {
    return `Rectangle[width=${this.name}]`;
  }
}
