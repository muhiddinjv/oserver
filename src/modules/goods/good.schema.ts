import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GoodDocument = Good & Document;

@Schema({ collection: 'goods', timestamps: true, versionKey: false })

export class Good {
  @Prop({ required: true })
  userId: string;
  
  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  price: number;

  @Prop({ default: 0 })
  cost: number;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ default: false })
  trackStock: boolean;

  @Prop({ default: false })
  isGroupItem: boolean;

  @Prop({ type: Date })
  expireDate: Date;
}

export const GoodSchema = SchemaFactory.createForClass(Good)
