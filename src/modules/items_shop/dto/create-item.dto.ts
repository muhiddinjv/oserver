import { ApiProperty } from '@nestjs/swagger';
export class CreateItemDto {
  @ApiProperty({
    description: 'product name',
    example: 'coca-cola',
  })
  name: string;
  @ApiProperty({
    description: 'This item is available in the shops with these ids',
    example: ['659fd2e1c9b1203a769f9542','659fd2e1c9b1203a769f9545'],
  })
  shop_ids: string[];

  item_global_ids: string[] | null;
}
