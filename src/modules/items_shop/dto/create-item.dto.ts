import { ApiProperty } from '@nestjs/swagger';
export class CreateItemDto {
  @ApiProperty({
    description: 'product name',
    example: 'coca-cola',
  })
  name: string;

  item_global_ids: string[] | null;
}
