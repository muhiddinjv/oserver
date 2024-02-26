import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ItemDocument = ItemShop & Document;

@Schema({ collection: 'items_shop' })
export class ItemShop {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner_id: { type: Types.ObjectId };

  @Prop({ maxlength: 64, default: 0, required: true})
  price: number;

  @Prop({default: 0, required: true})
  cost: number;

  @Prop({default: 0, required: true})
  count: number;

  @Prop({ ref:'ItemGlobal', type: Types.ObjectId, required: true })
  item_global_id: { type: Types.ObjectId };

  @Prop({ ref:'Shop', type: Types.ObjectId, required: true })
  shop_id: { type: Types.ObjectId };

  @Prop({ default: false })
  track_stock: boolean;

  @Prop({ default: false })
  is_group_item: boolean;

  @Prop({type: Date, required: false})
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
