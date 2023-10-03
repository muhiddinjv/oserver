import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Model, Shop, Users, Products } from '../../entities';

@Entity('Categories')
export class Categories extends Model {
  @Column()
  parent_id: number;

  @Column({ nullable: true })
  category_image: string;

  @ManyToOne(() => Shop, (shop) => shop.categories, { cascade: ['insert'] })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop[];

  @OneToMany(() => Products, (cat) => cat.categories, { cascade: ['insert'] })
  products: Products[];

  @Column()
  category_name: string;

  @Column()
  category_status: boolean;

  @Column()
  category_sort_order: number;

  @OneToMany((type) => Users, (creatById) => creatById.categroies, {
    cascade: ['update'],
  })
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
