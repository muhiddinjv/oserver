import { ApiProperty } from '@nestjs/swagger';
export class CreateShopDto {

  
  @ApiProperty({
    description: `price`,
    example: 5,
  })
  price: number;
 
}
