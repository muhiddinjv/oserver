import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PricingType } from 'src/enums/pricing_type.enum';
export type VariantDocument = Variant & Document;

@Schema({ collection: 'variants' })
export class Variant {
  @Prop({ type: Types.ObjectId })
  item_id: string;

  @Prop({ default: () => uuidv4() })
  reference_variant_id: string;

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
  shops: [];

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const VariantSchema = SchemaFactory.createForClass(Variant).set(
  'versionKey',
  false,
);
