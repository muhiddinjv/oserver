import { ApiProperty } from '@nestjs/swagger';

export class ProductgroupDto {
  @ApiProperty()
  shop: string;
  @ApiProperty()
  group_name: string;
  @ApiProperty()
  isSctive: boolean;
}
