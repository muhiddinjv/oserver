import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CatalogDocument = Catalog & Document;

@Schema({ collection: 'catalog', versionKey: false })

export class Catalog {
  @Prop({ default: null })
  userId: string;
  
  @Prop({ required: true })
  title: string;

  @Prop({ default: 0 })
  price: string;

  @Prop({ default: 0 })
  cost: string;

  @Prop({ default: 0 })
  quantity: string;

  @Prop({ default: 'temp_image.png' })
  image: string;

  @Prop({ default: false, required: true })
  groupItem: boolean;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog)


