import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Variant } from '../variants/variant.schema';
import { PricingType } from 'src/enums/pricing_type.enum';

export type ItemDocument = ItemGlobal & Document;

@Schema({ collection: 'items_global' })
export class ItemGlobal {
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

  @Prop({ type: Types.ObjectId, ref:'Category',  })
  category: { type: Types.ObjectId };

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const ItemGlobalSchema = SchemaFactory.createForClass(ItemGlobal).set(
  'versionKey',
  false,
);
