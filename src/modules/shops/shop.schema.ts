import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type ShopDocument = Shop & Document;

@Schema({ collection: 'shops' })
export class Shop {
  @Prop()
  name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ShopSchema = SchemaFactory.createForClass(Shop).set(
  'versionKey',
  false,
);
