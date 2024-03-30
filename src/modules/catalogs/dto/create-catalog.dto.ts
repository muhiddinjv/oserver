import { ApiProperty } from '@nestjs/swagger';

export class CreateCatalogDto {
  
  @ApiProperty({
    description: 'name',
    example: 'Book',
  })
  name: string;
  
  @ApiProperty({
    description: 'description',
    example: 'description about item',
  })
  description: string;
  
  @ApiProperty({
    description: 'category_id',
    example: '652e53dc816d176acdad441f',
  })
  category_id: string;

  @ApiProperty({
    description: 'form',
    example: 'form',
  })
  shape: string;
  
  @ApiProperty({
    description: 'color',
    example: 'blue',
  })
  color: string;
  
  @ApiProperty({
    description: 'option1_name',
    example: 'option1_name',
  })
  option1_name: string;
  
  @ApiProperty({
    description: 'option2_name',
    example: 'option2_name',
  })
  option2_name: string;
  
  @ApiProperty({
    description: 'option3_name',
    example: 'option3_name',
  })
  option3_name: string;
}
