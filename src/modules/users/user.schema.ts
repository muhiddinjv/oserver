import { Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/modules/roles/roles.enum';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop({ default: null })
  boss_id: Types.ObjectId;

  @Prop({ required: true })
  device_id: Types.ObjectId;

  @Prop({ minlength:3, maxlength: 64, default:"James" })
  first_name: string;

  @Prop({ minlength:3,maxlength: 64 })
  last_name: string;
  
  @Prop({minlength:3, maxlength: 192 })
  address: string;

  @Prop({  maxlength: 100 })
  email: string;

  @Prop({ nullable: true, maxlength: 100, required: true })
  password: string;

  @Prop()
  refresh_token: string;

  @Prop({ unique: true, maxlength: 15, required: true, default:'+998935399093' })
  phone_number: string;

  @Prop({ type: String, enum: Role, required: true, default: Role.Wholesaler }) 
  role: Role;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: 'defaultavatar.png' })
  photo: string;

  @Prop({minlength:4, maxlength: 40 })
  user_qr_code: string;

  @Prop({minlength:3, maxlength: 255 })
  note: string;

  @Prop()
  first_visit: Date;

  @Prop()
  last_visit: Date;

  @Prop({ default: 0 })
  total_visits: number;

  @Prop({ default: 0 })
  total_spent: number;

  @Prop({ default: 0 })
  total_points: number;
}

export const UserSchema = SchemaFactory.createForClass(User).set(
  'versionKey',
  false,
);
