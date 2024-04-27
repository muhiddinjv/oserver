import {
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsIn,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[998]\d{11}$/, { message: 'phone number must start with 998 and be 12 digits long' })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['wholesaler', 'retailer', 'admin'], { message: 'role must be wholesaler, retailer, or admin' })
  role: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, { message: 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 5 characters long' })
  password: string;

  @IsString()
  @IsOptional()
  refreshToken: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
