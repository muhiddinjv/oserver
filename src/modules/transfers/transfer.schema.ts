import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TransferDocument = Transfer & Document;

@Schema({ collection: 'transfers', timestamps: true, versionKey: false })

export class Transfer {
  @Prop({ type: String, required: true, ref: 'User' })
  buyerId: string;

  @Prop({ type: String, default: null, ref: 'User' })
  sellerId: string;

  @Prop({ type: [] })
  goods: any[];

  @Prop({ type: Number, default: 1 })
  status: number;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);