import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
export type ShopDocument = Shop & Document;

@Schema({ collection: 'shops' })
export class Shop {
  @Prop({required: true})
  name: string;

  @Prop({ref:'User', type: Types.ObjectId, default: null, required: true})
  owner: Types.ObjectId;

  // @Prop({ ref:'users', type: [{ type: Types.ObjectId }], default: [] })
  // staff: User[];

  // @Prop()
  // role: string;

  @Prop()
  location: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const ShopSchema = SchemaFactory.createForClass(Shop).set(
  'versionKey',
  false,
);
