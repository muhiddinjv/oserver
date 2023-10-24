import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../products/product.schema';
export type CategoryDocument = Category & Document;

@Schema({ collection: 'categories' })
export class Category {
  @Prop({ maxlength: 64 })
  category_image: string;

  @Prop({ maxlength: 64, required: true })
  category_name: string;

  @Prop({ default: true })
  category_status: boolean;

  @Prop({ maxlength: 64, required: true })
  category_sort_order: string;

  @Prop({ type: Types.ObjectId })
  shop_id: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId }] })
  products: Product[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category).set(
  'versionKey',
  false,
);
