import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PricingType } from 'src/common/pricing_type.enum';
export type VariantsDocument = Variants & Document;

@Schema({ collection: 'variants' })
export class Variants {
  @Prop({ type: Types.ObjectId })
  item_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, maxlength: 128 })
  reference_variant_id: Types.ObjectId;

  @Prop({ maxlength: 40, required: true })
  sku: string;

  @Prop({ maxlength: 20, required: true })
  option1_value: string;

  @Prop({ maxlength: 20, required: true })
  option2_value: string;

  @Prop({ maxlength: 20, required: true })
  option3_value: string;

  @Prop({ maxlength: 128, required: true })
  barcode: string;

  @Prop({ default: 0 })
  cost: number;

  @Prop({ default: 0 })
  purchase_cost: number;

  @Prop({ default: PricingType.VARIABLE, enum: PricingType })
  default_pricing_type: PricingType;

  @Prop()
  default_price: number;

  @Prop({ type: [] })
  stores: [];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const VariantsSchema = SchemaFactory.createForClass(Variants).set(
  'versionKey',
  false,
);
