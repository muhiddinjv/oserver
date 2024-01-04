import { ApiProperty } from '@nestjs/swagger';
export class AuthDto {
  @ApiProperty({
    description: `phoneNumber`,
    example: '+998997811356',
  })
  phoneNumber: string;


  @ApiProperty({
    description: `Password`,
    example: 'Pa55w0rd',
  })
  password: string;
}
