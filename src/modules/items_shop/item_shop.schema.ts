import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ItemGlobal } from '../items_global/item_global.schema';
import { Shop } from '../shops/shop.schema';

export type ItemDocument = ItemShop & Document;

@Schema({ collection: 'items_shop' })
export class ItemShop {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: { type: Types.ObjectId };

  @Prop({required: true})
  name: string;

  @Prop({ default: 0})
  price: number;

  @Prop({default: 0})
  cost: number;

  @Prop({default: 0})
  count: number;

  @Prop({ type: Types.ObjectId, ref:'ItemGlobal' })
  item_global: ItemGlobal[];

  @Prop({ type: Types.ObjectId, ref:'Shop', required: true })
  shop: Shop[];

  @Prop({ type: Types.ObjectId, ref:'Category', required: true })
  category: { type: Types.ObjectId };

  @Prop({ default: false })
  track_stock: boolean;

  @Prop({ default: false })
  is_group_item: boolean;

  @Prop({type: Date})
  expire_date: Date

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const Itemschema = SchemaFactory.createForClass(ItemShop).set(
  'versionKey',
  false,
);
