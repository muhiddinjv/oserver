import { ApiProperty } from '@nestjs/swagger';
export class SendSmsDto {
  @ApiProperty({
    description: `phoneNumber`,
    example: '998123456789',
  })
  phoneNumber: string;


}
