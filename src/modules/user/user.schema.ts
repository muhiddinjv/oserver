import { HydratedDocument, Model, Types } from 'mongoose';
import {
  Prop,
  Schema,
  SchemaFactory,
  ModelDefinition,
  InjectModel,
} from '@nestjs/mongoose';
import { Role } from '../../common/role.enum';

@Schema({ collection: 'users' })
export class User {
  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ nullable: true, type: String })
  email: string;

  @Prop({ unique: true, required: true, type: Number })
  phoneNumber: number;

  @Prop({ type: String, required: true, enum: Role })
  role: Role;

  @Prop({ type: Types.ObjectId })
  shopId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;

export type UserModel = Model<User>;

export const UserModelDefinition: ModelDefinition = {
  name: User.name,
  schema: UserSchema,
};

export function InjectUserModel() {
  return function (target, key, index) {
    InjectModel(User.name)(target, key, index);
  };
}
