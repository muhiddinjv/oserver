import { ApiProperty } from '@nestjs/swagger';
export class CreateItemDto {
  
  @ApiProperty({
    description: 'global_item_id',
    example: '659fe3e10eb1b06276851be5',
  })
  name: string;
  
  @ApiProperty({
    description: 'shop_id',
    example: '659fd2e1c9b1203a769f9542',
  })
  description: string;
}
