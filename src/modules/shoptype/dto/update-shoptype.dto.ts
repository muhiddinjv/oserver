import { PartialType } from '@nestjs/swagger';
import { CreateShoptypeDto } from './create-shoptype.dto';

export class UpdateShoptypeDto extends PartialType(CreateShoptypeDto) {}
