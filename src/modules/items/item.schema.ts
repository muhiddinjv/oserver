import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Variant } from '../variants/variant.schema';
import { Component } from '../components/component.schema';
import { PricingType } from 'src/enums/pricing_type.enum';

export type ItemDocument = Item & Document;

@Schema({ collection: 'items' })
export class Item {
  @Prop({ maxlength: 64, required: true })
  name: string;

  @Prop()
  price: number;

  @Prop()
  cost: number;

  @Prop()
  count: number;

  @Prop({ required: true })
  shape: string;

  @Prop({ required: true })
  color: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: PricingType.VARIABLE, enum: PricingType })
  pricingType: PricingType;

  @Prop({ type: [{ type: Types.ObjectId }] })
  variants: Variant[];

  @Prop({ default: () => uuidv4() })
  referenceId: string;

  @Prop({ type: Types.ObjectId })
  categoryId: { type: Types.ObjectId };

  @Prop({ default: false })
  trackStock: boolean;

  @Prop({ default: true })
  availableForSale: boolean;

  @Prop({ default: null })
  optimalStock: number;

  @Prop({ default: null })
  lowStock: number;

  @Prop({ default: false })
  soldByWeight: boolean;

  @Prop({ default: false })
  isComposite: boolean;

  @Prop({ default: false })
  useItemion: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Components' }] })
  components: Component[];

  @Prop({ type: Types.ObjectId })
  primarySupplierId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  modifiersIds: Types.ObjectId;

  @Prop({ required: true })
  option1Name: string;

  @Prop({ required: true })
  option2Name: string;

  @Prop({ required: true })
  option3Name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const Itemschema = SchemaFactory.createForClass(Item).set(
  'versionKey',
  false,
);
