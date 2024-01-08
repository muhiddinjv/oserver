import { Document,Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Permit } from '../permits/permit.schema';
export type RoleDocument = Role & Document;

@Schema({ collection: 'roles' })
export class Role {
  @Prop({ maxlength: 64, required: true })
  name: string;

  @Prop({ type: Types.ObjectId })
  user_id: string;

  @Prop({ type: [{ type: Types.ObjectId }] })
  permit: Permit[];

}

export const RolesSchema = SchemaFactory.createForClass(Role).set(
  'versionKey',
  false,
);
