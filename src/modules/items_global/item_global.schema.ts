import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ItemGlobalDocument = ItemGlobal & Document;

@Schema({ collection: 'items_global', timestamps: true, versionKey: false })

export class ItemGlobal {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  price: number;

  @Prop({ default: 0 })
  cost: number;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ default: null })
  user_id: string;

  @Prop({ default: false })
  track_stock: boolean;

  @Prop({ default: false })
  is_group_item: boolean;

  @Prop({ type: Date })
  expire_date: Date;
}

export const ItemGlobalSchema = SchemaFactory.createForClass(ItemGlobal)


