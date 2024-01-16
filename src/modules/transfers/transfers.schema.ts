import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TransferDocument = Transfer& Document;

@Schema({ collection: 'transfers' })
export class Transfer{
  @Prop({ maxlength: 64, default: 0, required: true, enum: ['proccess', 'pending', 'confirmed']})
  status: string;

  @Prop({default: 0, required: true})
  pay_type: string;

  @Prop({type:[
    {
      items_global_id: {
        type: Types.ObjectId,
        ref: 'ItemGlobal',
        required: true
      } ,
      items_shop_id: {
        type: Types.ObjectId,
        ref: 'ItemShop',
        required: true
      },
      price: {
        type: Number,
        required: true
      }, 
      count: {
        type: Number,
        required: true
      }, 
      cost: {
        type: Number,
        required: true
      } 
    },
  ]})
  items:{items_global_id: Types.ObjectId, count: number, price: number,cost: number, items_shop_id: Types.ObjectId}[]

  // @Prop({ ref:'ItemGlobal', type: Types.ObjectId, required: true })
  // item_global_id: { type: Types.ObjectId };

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