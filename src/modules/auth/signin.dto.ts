import {
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    IsIn,
    IsPhoneNumber,
    IsStrongPassword,
  } from 'class-validator';
  
  export class SignInDto {
    // @Matches(/^998\d{9}$/, { message: 'Phone number must start with 998 and be 12 digits long' })
    @IsString({message: "Phone number must be a string"})
    @IsNotEmpty({message: "Phone number should not be empty"})
    @IsPhoneNumber('UZ')
    phoneNumber: string;
  
    // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, { message: 'Password must contain at least \n-one number, \n-one lowercase letter \n-one uppercase letter \n-be min 5 chars long' })
    // @IsStrongPassword()
    @IsNotEmpty()
    password: string;
      
    @IsOptional()
    @IsString()
    @IsIn(['wholesaler', 'retailer', 'admin'], { message: 'role must be wholesaler, retailer, or admin' })
    role: string;
  }
  