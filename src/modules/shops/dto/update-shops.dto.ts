import { PartialType } from '@nestjs/mapped-types';
import { CreateShopsDto } from './create-shops.dto';

export class UpdateShopsDto extends PartialType(CreateShopsDto) {}
