import { PartialType } from '@nestjs/swagger';
import { CreatePricetypeDto } from './create-pricetype.dto';

export class UpdatePricetypeDto extends PartialType(CreatePricetypeDto) {}
