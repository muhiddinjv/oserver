import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Variant } from '../variants/variant.schema';
import { Component } from '../components/component.schema';
import { PricingType } from 'src/enums/pricing_type.enum';

export type ItemDocument = GlobalItem & Document;

@Schema({ collection: 'global_items' })
export class GlobalItem {
  @Prop({ maxlength: 64, required: true })
  name: string;

  @Prop()
  shape: string;

  @Prop()
  color: string;

  @Prop()
  image: string;

  @Prop()
  description: string;

  @Prop({ default: PricingType.VARIABLE, enum: PricingType })
  pricing_type: PricingType;

  @Prop({ type: [{ type: Types.ObjectId }] })
  variants: Variant[];

  @Prop({ default: false })
  sold_by_weight: boolean;

  @Prop({ default: false })
  is_group_item: boolean;

  @Prop({ ref:'categories', type: Types.ObjectId })
  category_id: { type: Types.ObjectId };

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const GlobalItemSchema = SchemaFactory.createForClass(GlobalItem).set(
  'versionKey',
  false,
);
