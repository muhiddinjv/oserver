import { ApiProperty } from '@nestjs/swagger';
export class CreateComponentDto {
  @ApiProperty({
    description: `quantity`,
    example: 4,
  })
  quantity: number;

  @ApiProperty({
    description: `variant_id`,
    example: '652e55f205aaf5a5bd028999',
  })
  variant_id: string;
}
