import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Shop } from '../shops/shop.schema';

export type ItemShopDocument = ItemShop & Document;

@Schema({ collection: 'items_shop' })
export class ItemShop {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  price: number;

  @Prop({ default: 0 })
  cost: number;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ required: true })
  user_id: string;

  @Prop({ type: Types.ObjectId || null, ref: 'Shop' })
  shop_ids: Shop[];

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

export const Itemschema = SchemaFactory.createForClass(ItemShop).set(
  'versionKey',
  false,
);
