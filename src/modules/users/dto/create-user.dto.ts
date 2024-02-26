import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    description: 'first_name',
    example: 'James',
  })
  first_name: string;


  @ApiProperty({
    description: 'last_name',
    example: 'Bond',
  })
  last_name: string;

  @ApiProperty({
    description: 'business',
    example: 'Mega Planet',
  })
  business: string;

 
  @ApiProperty({
    description: 'phone_number',
    example: '+998935399093',
  })
  phone_number: string;


  @ApiProperty({
    description: 'Password',
    example: 'admin123',
  })
  password: string;


  shop: string;

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
 
  refresh_token: string;


  @ApiProperty({
    description: 'address',
    example: 'Toshkent Chorsu 1 street',
  })
  address: string;


  @ApiProperty({
    description: 'user_qr_code',
    example: 4444,
  })
  user_qr_code: number;
}
