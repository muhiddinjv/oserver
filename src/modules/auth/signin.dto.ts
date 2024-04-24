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
    @IsPhoneNumber('UZ',{message: "Phone must match 998912345678"})
    phoneNumber: string;
  
    // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, { message: 'Password must contain at least \n-one number, \n-one lowercase letter \n-one uppercase letter \n-be min 5 chars long' })
    // @IsStrongPassword()
    @IsNotEmpty({message: "Password should not be empty"})
    password: string;
      
    @IsOptional()
    @IsString()
    @IsIn(['wholesaler', 'retailer', 'admin'], { message: 'Role must be wholesaler, retailer, or admin' })
    role: string;
  }
  