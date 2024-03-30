import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    description: 'firstName',
    example: 'James',
  })
  firstName: string;


  @ApiProperty({
    description: 'lastName',
    example: 'Bond',
  })
  lastName: string;

  @ApiProperty({
    description: 'business',
    example: 'Mega Planet',
  })
  business: string;

 
  @ApiProperty({
    description: 'phoneNumber',
    example: '+998935399093',
  })
  phoneNumber: string;


  @ApiProperty({
    description: 'Password',
    example: 'admin123',
  })
  password: string;

  @ApiProperty({
    description: 'email',
    example: 'admin@gmail.com',
  })
  email: string
  

  @ApiProperty({
    description: 'role',
    example: 'admin',
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
