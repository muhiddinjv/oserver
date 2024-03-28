import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ItemShopDocument = ItemShop & Document;

@Schema({ collection: 'items_shop', timestamps: true, versionKey: false })

export class ItemShop {
  @Prop({ required: true })
  user_id: string;
  
  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  price: number;

  @Prop({ default: 0 })
  cost: number;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ default: false })
  track_stock: boolean;

  @Prop({ default: false })
  is_group_item: boolean;

  @Prop({ type: Date })
  expire_date: Date;
}

export const Itemschema = SchemaFactory.createForClass(ItemShop)
