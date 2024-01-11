import { Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../../enums/role.enum';
// import { Shop } from '../shops/shop.schema';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop({ minlength:3, maxlength: 64 })
  first_name: string;

  @Prop({ minlength:3,maxlength: 64 })
  last_name: string;

  @Prop({ type: Types.ObjectId, required: true, default: 'Akfa Group' })
  business: Types.ObjectId;
  
  @Prop({minlength:3, maxlength: 192 })
  address: string;

  @Prop({  maxlength: 100 })
  email: string;

  @Prop({ nullable: true, maxlength: 100, required: true, default:'P@55w0rd' })
  password: string;

  @Prop()
  refresh_token: string;

  @Prop({ unique: true, maxlength: 15, required: true, default:'998911234567' })
  phone_number: string;

  @Prop({ type: String, enum: Role, default:Role.MERCHANT }) 
  role: Role;

  // @Prop({ ref:'shops', type: [{ type: Types.ObjectId }] })
  // shops: Shop[];

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
