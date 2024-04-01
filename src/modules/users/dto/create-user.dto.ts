import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    description: 'first name',
    example: 'Michael',
  })
  firstName: string;

  @ApiProperty({
    description: 'last name',
    example: 'Jackson',
  })
  lastName: string;
 
  @ApiProperty({
    description: 'phone number',
    example: '998935399093',
    required: true
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'password',
    example: 'admin123',
  })
  password: string;  

  @ApiProperty({
    description: 'role',
    example: "Admin|Wholesaler|Retailer"
  })
  role: string;
 
  refreshToken: string;

  @ApiProperty({
    description: 'address',
    example: 'Toshkent Chorsu Apple street',
  })
  address: string;


  @ApiProperty({
    description: 'userQrCode',
    example: 4444,
  })
  userQrCode: number;
}
