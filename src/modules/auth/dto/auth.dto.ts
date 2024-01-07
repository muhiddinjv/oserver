import { ApiProperty } from '@nestjs/swagger';
export class AuthDto {
  @ApiProperty({
    description: `phone_number`,
    example: '+998997811356',
  })
  phone_number: string;


  @ApiProperty({
    description: `Password`,
    example: 'Pa55w0rd',
  })
  password: string;
}
