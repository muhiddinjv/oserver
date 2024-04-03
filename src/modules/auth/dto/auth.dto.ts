import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthDto {
  constructor(partial: Partial<AuthDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  @ApiProperty()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  readonly password: string;

  @IsString()
  @ApiProperty()
  readonly phone: string;
}