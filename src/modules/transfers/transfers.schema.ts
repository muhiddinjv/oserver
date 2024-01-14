import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Variant } from '../variants/variant.schema';
import { Component } from '../components/component.schema';
import { PricingType } from 'src/enums/pricing_type.enum';

export type TransferDocument = Transfer& Document;

@Schema({ collection: 'transfers' })
export class Transfer{
  @Prop({ maxlength: 64, default: 0, required: true, enum: ['proccess', 'pending', 'confirmed']})
  status: string;

  @Prop({default: 0, required: true})
  pay_type: string;

  @Prop({type:[
    {
      global_items_id: {
        type: Types.ObjectId,
        ref: 'GlobalItem',
        required: true
      } 
    },
    {
      shop_items_id: {
        type: Types.ObjectId,
        ref: 'ShopItem',
        required: true
      }
    },
    {
      price: {
        type: Number,
        required: true
      } 
    },
    {
      count: {
        type: Number,
        required: true
      } 
    },
    {
      cost: {
        type: Number,
        required: true
      } 
    },
  ]})
  items:{global_items_id: Types.ObjectId, count: number, price: number,cost: number, shop_items_id: Types.ObjectId}[]
  @Prop({ ref:'GlobalItem', type: Types.ObjectId, required: true })
  global_item_id: { type: Types.ObjectId };

  @Prop({ ref:'Shop', type: Types.ObjectId, required: true })
  sender_id: { type: Types.ObjectId };

  @Prop({ ref:'Shop', type: Types.ObjectId, required: true, default: null })
  receiver_id: { type: Types.ObjectId };

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer).set(
  'versionKey',
  false,
);