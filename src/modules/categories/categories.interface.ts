import { Document } from 'mongoose';

export interface ICategories extends Document {
  readonly categories_image: string;
  readonly category_name: string;
  readonly category_status: boolean;
  readonly category_sort_order: string;
}
