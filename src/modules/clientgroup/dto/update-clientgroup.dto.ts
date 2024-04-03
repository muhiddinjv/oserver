import { PartialType } from '@nestjs/swagger';
import { CreateClientgroupDto } from './create-clientgroup.dto';

export class UpdateClientgroupDto extends PartialType(CreateClientgroupDto) {}
