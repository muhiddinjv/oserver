import { Document } from 'mongoose';

export interface IShops extends Document {
  readonly pricing_type: string;
  readonly price: number;
  readonly available_for_sale: boolean;
  readonly low_stock: number;
}
