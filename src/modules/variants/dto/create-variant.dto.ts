import { ApiProperty } from '@nestjs/swagger';
export class CreateVariantDto {

  @ApiProperty({
    description: `item_id`,
    example: '653a62bfa2d9c7f3e08434d7',
  })
  item_id: string;

  @ApiProperty({
    description: `sku`,
    example: 'sku',
  })
  sku: string;

  @ApiProperty({
    description: `option1_value`,
    example: 'option1_value',
  })
  option1_value: string;

  @ApiProperty({
    description: `optionValue`,
    example: 'optionValue',
  })
  option2_value: string;

  @ApiProperty({
    description: `optionValue`,
    example: 'optionValue',
  })
  option3_value: string;

  @ApiProperty({
    description: `barcode`,
    example: '1219209102',
  })
  barcode: string;
}
