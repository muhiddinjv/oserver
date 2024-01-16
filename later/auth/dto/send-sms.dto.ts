import { ApiProperty } from '@nestjs/swagger';
export class SendSmsDto {
  @ApiProperty({
    description: `phone_number`,
    example: '998123456789',
  })
  phone_number: string;


}
