import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type ComponentDocument = Component & Document;

@Schema({ collection: 'components' })
export class Component {
  @Prop({ type: Types.ObjectId })
  variant_id: string;

  @Prop()
  quantity: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const ComponentSchema = SchemaFactory.createForClass(Component).set(
  'versionKey',
  false,
);
