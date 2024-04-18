import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    Matches,
    IsIn,
  } from 'class-validator';
  
  export class SignInDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/^998\d{9}$/, { message: 'phone number must start with 998 and be 12 digits long' })
    phoneNumber: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, { message: 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 5 characters long' })
    password: string;
      
    @IsOptional()
    @IsString()
    @IsIn(['wholesaler', 'retailer', 'admin'], { message: 'role must be wholesaler, retailer, or admin' })
    role: string;
  }
  