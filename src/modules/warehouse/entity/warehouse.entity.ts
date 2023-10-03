import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { StoreType } from '../../shop/storetype.enums';
import { Shop, Model, ProductWarehouse } from '../../entities';

@Entity('Warehouse')
export class Warehouse extends Model {
  @Column()
  name: string;

  @ManyToOne((type) => Shop, (shop) => shop.warehouse, { cascade: ['update'] })
  shop: Shop[];

  @OneToMany((type) => ProductWarehouse, (warehouse) => warehouse.warehouse, {
    cascade: ['update'],
  })
  warehose: Warehouse;

  @Column()
  is_default: number;

  @Column()
  status: number;

  @Column({
    type: 'enum',
    enum: StoreType,
    default: StoreType.WAREHOUSE_REALIZATION,
  })
  storetype: StoreType;
}
