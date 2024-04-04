import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CatalogDocument = Catalog & Document;

@Schema({ collection: 'catalog', versionKey: false })

export class Catalog {
  @Prop({ default: null })
  userId: string;
  
  @Prop({ required: true })
  name: string;

  @Prop({ default: 'temp_image.png' })
  image: string;

  @Prop({ required: true, default: false })
  isGroupItem: boolean;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog)


