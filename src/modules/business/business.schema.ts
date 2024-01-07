import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Shop } from '../shops/shop.schema';
import { User } from '../users/user.schema';
import { Role } from '../roles/role.schema';
export type BusinessDocument = Business & Document;

@Schema({ collection: 'business' })
export class Business {

  @Prop({ maxlength: 120, required: true })
  name: string;

  @Prop({ type: Types.ObjectId })
  owner: string;

  @Prop({ type: [{ type: Types.ObjectId }]  })
  staff: User[];

  @Prop({ type: [{ type: Types.ObjectId }]  })
  role: Role[];

  @Prop({ type: [{ type: Types.ObjectId }] })
  shops: Shop[];

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const BusinessSchema = SchemaFactory.createForClass(Business).set(
  'versionKey',
  false,
);
