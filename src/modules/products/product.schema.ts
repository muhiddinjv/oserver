import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Variant } from '../variants/variant.schema';
import { Components } from '../components/component.schema';
export type ProductDocument = Product & Document;

@Schema({ collection: 'products' })
export class Product {
  @Prop({ maxlength: 64, required: true })
  item_name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId }] })
  variants: Variant[];

  @Prop({ default: () => uuidv4() })
  reference_id: string;

  @Prop({ type: Types.ObjectId })
  category_id: { type: Types.ObjectId };

  @Prop({ default: false })
  track_stock: boolean;

  @Prop({ default: false })
  sold_by_weight: boolean;

  @Prop({ default: false })
  is_composite: boolean;

  @Prop({ default: false })
  use_production: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Components' }] })
  components: Components[];

  @Prop({ type: Types.ObjectId })
  primary_supplier_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  tax_ids: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  modifiers_ids: Types.ObjectId;

  @Prop({ required: true })
  form: string;

  @Prop({ required: true })
  color: string;

  @Prop()
  image_url: string;

  @Prop({ required: true })
  option1_name: string;

  @Prop({ required: true })
  option2_name: string;

  @Prop({ required: true })
  option3_name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product).set(
  'versionKey',
  false,
);
