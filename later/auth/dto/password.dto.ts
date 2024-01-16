import { ApiProperty } from '@nestjs/swagger';
export class PassworgDto {

  @ApiProperty({
    description: `Password`,
    example: 'Pa55w0rd',
  })
  password: string;

  @ApiProperty({
    description: `passwordConfig`,
    example: 'Pa55w0rd',
  })
  passwordConfig: string;
}
