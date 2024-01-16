import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ItemGlobal } from '../items_global/item_global.schema';
export type CategoryDocument = Category & Document;

@Schema({ collection: 'categories' })
export class Category {
  @Prop({ maxlength: 64 })
  image: string;

  @Prop({ maxlength: 64, required: true })
  name: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ maxlength: 64 })
  sort_order: string;

  @Prop({ type: Types.ObjectId, ref:'Shop' })
  shop_id: Types.ObjectId;

  @Prop({ maxlength: 64 })
  slug: string;

  @Prop({ ref:'items', type: [{ type: Types.ObjectId }] })
  items: ItemGlobal[];

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category).set(
  'versionKey',
  false,
);
