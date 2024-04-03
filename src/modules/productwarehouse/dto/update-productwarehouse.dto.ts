import { PartialType } from '@nestjs/swagger';
import { CreateProductwarehouseDto } from './create-productwarehouse.dto';

export class UpdateProductwarehouseDto extends PartialType(CreateProductwarehouseDto) {}
