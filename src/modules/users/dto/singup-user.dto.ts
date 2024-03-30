import { ApiProperty } from '@nestjs/swagger';
export class SingUpUserDto {
  @ApiProperty({
    description: 'firstName',
    example: 'Jones',
  })
  firstName: string;


  @ApiProperty({
    description: 'lastName',
    example: 'Show',
  })
  lastName: string;

  @ApiProperty({
    description: 'business',
    example: 'Mega Planet',
  })
  business: string;

 
  @ApiProperty({
    description: 'phoneNumber',
    example: '+998997811356',
  })
  phoneNumber: string;


  @ApiProperty({
    description: 'Password',
    example: 'dsk_45lldD&',
  })
  password: string;
  email: string

  @ApiProperty({
    description: 'role',
    example: 'wholesaler',
  })
  role: string;

 
  refreshToken: string;


  @ApiProperty({
    description: 'address',
    example: 'Toshkent Chorsu 1 street',
  })
  address: string;


  @ApiProperty({
    description: 'userQrCode',
    example: 4444,
  })
  userQrCode: number;
}
