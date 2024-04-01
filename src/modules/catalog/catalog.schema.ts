import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CatalogDocument = Catalog & Document;

@Schema({ collection: 'catalog', timestamps: true, versionKey: false })

export class Catalog {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  price: number;

  @Prop({ default: 0 })
  cost: number;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ default: null })
  userId: string;

  @Prop({ default: false })
  trackStock: boolean;

  @Prop({ default: false })
  isGroupItem: boolean;

  @Prop({ type: Date })
  expireDate: Date;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog)


