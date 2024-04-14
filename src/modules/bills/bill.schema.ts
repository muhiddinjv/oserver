import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BillDocument = Bill & Document;

@Schema({ collection: 'bills', timestamps: true, versionKey: false })

export class Bill {
  @Prop({ type: String, required: true, ref: 'User' })
  staff: string;

  @Prop({ type: String, default: null, ref: 'User' })
  buyer: string;

  @Prop({ type: [] })
  goods: any[];

  @Prop({ type: Number, required: true })
  grandTotal: number;

  @Prop({ type: Number, default: 1 })
  status: number;
}

export const Billschema = SchemaFactory.createForClass(Bill);
