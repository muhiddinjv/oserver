import { Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../roles/roles.decorator';

export type UserDocument = User & Document;

@Schema({ collection: 'users', timestamps: true, versionKey: false })

export class User {
  @Prop({ default: null })
  bossId: Types.ObjectId;

  @Prop({ minlength: 3, maxlength: 64, required: true })
  firstName: string;

  @Prop({ minlength: 3, maxlength: 64, required: true })
  lastName: string;

  @Prop({ minlength: 3, maxlength: 192, required: true })
  address: string;

  @Prop({ default: 'defaultavatar.png' })
  photo: string;

  @Prop({ nullable: true, maxlength: 100, required: true })
  password: string;

  @Prop({ unique: true, maxlength: 15, required: true, })
  phoneNumber: string;

  @Prop({ type: String, enum: Role, required: true, default: Role.Wholesaler })
  role: Role;

  @Prop({ default: 1 })
  status: number;
  
  // @Prop({ required: true })
  // deviceId: Types.ObjectId;

  // @Prop()
  // refreshToken: string;

  // @Prop({  maxlength: 100 })
  // email: string;


  // @Prop({minlength:4, maxlength: 40 })
  // userQrCode: string;

  // @Prop({minlength:3, maxlength: 255 })
  // note: string;

  // @Prop()
  // firstVisit: Date;

  // @Prop()
  // lastVisit: Date;

  // @Prop({ default: 0 })
  // totalVisits: number;

  // @Prop({ default: 0 })
  // totalSpent: number;

  // @Prop({ default: 0 })
  // totalPoints: number;
}

export const UserSchema = SchemaFactory.createForClass(User)
