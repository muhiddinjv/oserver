import { Document } from 'mongoose';
import { Product } from '../products/product.schema';

export interface ICategory extends Document {
  readonly category_image: string;
  readonly category_name: string;
  readonly category_status: boolean;
  readonly category_sort_order: string;
  readonly products: Product[];
}
