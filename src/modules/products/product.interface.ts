import { Document } from 'mongoose';
import { Icomponent } from '../components/component.interface';
import { IVariant } from '../variants/variant.interface';

export interface IProduct extends Document {
  readonly item_name: string;
  readonly description: string;
  readonly reference_id: string;
  readonly category_id: string;
  readonly track_stock: boolean;
  readonly sold_by_weight: boolean;
  readonly is_composite: boolean;
  readonly use_production: boolean;
  readonly components: Icomponent[];
  readonly primary_supplier_id: string;
  readonly tax_ids: string;
  readonly form: string;
  readonly color: string;
  readonly option1_name: string;
  readonly option2_name: string;
  readonly option3_name: string;
  readonly variants: IVariant[];
}
