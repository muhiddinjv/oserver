import { Document ,Types} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type PermissionDocument = Permission & Document;

@Schema({ collection: 'permissions' })
export class Permission {
    @Prop({ maxlength: 64, required: true })
    name: string;

    @Prop({ type: Types.ObjectId })
    role_id: string;
    
    @Prop({ type: Types.ObjectId })
    permission_category_id: string;
}

export const PermissionsSchema = SchemaFactory.createForClass(Permission).set(
  'versionKey',
  false,
);
