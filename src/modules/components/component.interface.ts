import { Document } from 'mongoose';

export interface Icomponent extends Document {
  readonly variant_id: string;
  readonly quantity: number;
}
