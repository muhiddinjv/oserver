import { Document ,Types} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type PermitDocument = Permit & Document;

@Schema({ collection: 'permits' })
export class Permit {
    @Prop({ maxlength: 64, required: true })
    name: string;

    @Prop({ type: Types.ObjectId })
    role_id: string;
    
    @Prop({ type: Types.ObjectId })
    permit_category_id: string;
}

export const PermitsSchema = SchemaFactory.createForClass(Permit).set(
  'versionKey',
  false,
);
