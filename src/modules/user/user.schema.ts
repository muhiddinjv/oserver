import { HydratedDocument, Model, Types } from 'mongoose';
import {
  Prop,
  Schema,
  SchemaFactory,
  ModelDefinition,
  InjectModel,
} from '@nestjs/mongoose';
import { Role } from '../../common/role.enum';

import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })

export class User {
  @Prop({ maxlength: 64 })
  firstName: string;

  @Prop({ maxlength: 64 })
  lastName: string;

  @Prop({ maxlength: 64 })
  businessName: string;

  @Prop({ maxlength: 192 })
  address: string;

  @Prop({ maxlength: 64 })
  city: string;

  @Prop({maxlength: 64 })
  region: string;

  @Prop({ nullable: true, maxlength: 100, unique: true })
  email: string;

  @Prop({ nullable: true })
  password: string;

  @Prop()
  refreshToken: string;

  @Prop({ unique: true, required: true, maxlength: 12 })
  phoneNumber: string;

  @Prop({ type: String, required: true, enum: Role })
  role: Role;

  @Prop({ type: Types.ObjectId })
  shopId: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 'defaultavatar.png'})
  photo: string;

  @Prop({ maxlength: 40 })
  userQRCode: string;

  @Prop({ maxlength: 255 })
  note: string;

  @Prop()
  firstVisit: Date;

  @Prop()
  lastVisit: Date;

  @Prop({ default: 0 })
  totalVisits: number;

  @Prop({ default: 0 })
  totalSpent: number;

  @Prop({ default: 0 })
  totalPoints: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

// export type UserDocument = HydratedDocument<User>;

// export type UserModel = Model<User>;

// export const UserModelDefinition: ModelDefinition = {
//   name: User.name,
//   schema: UserSchema,
// };

// export function InjectUserModel() {
//   return function (target, key, index) {
//     InjectModel(User.name)(target, key, index);
//   };
// }
