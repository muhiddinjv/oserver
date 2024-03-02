import { ApiProperty } from '@nestjs/swagger';
export class CreateItemDto {
  @ApiProperty({
    description: 'product name',
    example: 'coca-cola',
  })
  name: string;
  
  @ApiProperty({
    description: 'shop id',
    example: '659fd2e1c9b1203a769f9542',
  })
  shop: string | any;

  item_global_ids: string[] | null;
}
