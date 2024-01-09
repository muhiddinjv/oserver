import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type ShopDocument = Shop & Document;

@Schema({ collection: 'shops' })
export class Shop {
  @Prop()
  name: string;

  @Prop()
  owner: string;

  @Prop({ type: [] })
  staff: [];

  @Prop()
  role: string;

  @Prop()
  location: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const ShopSchema = SchemaFactory.createForClass(Shop).set(
  'versionKey',
  false,
);
