import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PricingType } from 'src/common/pricing_type.enum';
export type ShopDocument = Shop & Document;

@Schema({ collection: 'shops' })
export class Shop {
  @Prop({ default: PricingType.VARIABLE, enum: PricingType })
  pricing_type: PricingType;

  @Prop()
  price: number;

  @Prop({ default: true })
  available_for_sale: boolean;

  @Prop({ default: null })
  optimal_stock: number;

  @Prop({ default: null })
  low_stock: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ShopSchema = SchemaFactory.createForClass(Shop).set(
  'versionKey',
  false,
);
