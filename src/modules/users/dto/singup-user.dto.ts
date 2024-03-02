import { ApiProperty } from '@nestjs/swagger';
export class SingUpUserDto {
  @ApiProperty({
    description: 'first_name',
    example: 'Jones',
  })
  first_name: string;


  @ApiProperty({
    description: 'last_name',
    example: 'Show',
  })
  last_name: string;

  @ApiProperty({
    description: 'business',
    example: 'Mega Planet',
  })
  business: string;

 
  @ApiProperty({
    description: 'phone_number',
    example: '+998997811356',
  })
  phone_number: string;


  @ApiProperty({
    description: 'Password',
    example: 'dsk_45lldD&',
  })
  password: string;
  email: string

  @ApiProperty({
    description: 'shop',
    example: ['shop_id','shop_id'],
  })
  shop: string;



  @ApiProperty({
    description: 'role',
    example: 'wholesaler',
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
