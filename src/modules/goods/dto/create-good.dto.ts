import { ApiProperty } from '@nestjs/swagger';
export class CreateGoodDto {
  @ApiProperty({
    description: 'product name',
    example: 'coca-cola',
  })
  name: string;

  catalogIds: string[] | null;
}
