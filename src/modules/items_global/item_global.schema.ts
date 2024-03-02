import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Shop } from '../shops/shop.schema';

export type ItemDocument = ItemGlobal & Document;

@Schema({ collection: 'items_global' })

export class ItemGlobal {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  price: number;

  @Prop({ default: 0 })
  cost: number;

  @Prop({ default: 0 })
  count: number;

  @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
  shop: Shop[];

  @Prop({ default: false })
  track_stock: boolean;

  @Prop({ default: false })
  is_group_item: boolean;

  @Prop({ type: Date })
  expire_date: Date;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const ItemGlobalSchema = SchemaFactory.createForClass(ItemGlobal).set(
  'versionKey',
  false,
);


