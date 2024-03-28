import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ItemShop, Itemschema } from '../items_shop/item_shop.schema';

export type BillDocument = Bill & Document;

@Schema({ collection: 'bills', timestamps: true, versionKey: false })

export class Bill {
  @Prop({ type: String, required: true, ref: 'User' })
  staff_id: string;

  @Prop({ type: String, default: null, ref: 'User' })
  buyer_id: string;

  @Prop({ type: [Itemschema] })
  items: ItemShop[]

  @Prop({ type: Number, required: true })
  total_price: number;

  @Prop({ type: Number, default: 0 })
  status: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const Billschema = SchemaFactory.createForClass(Bill);
