import { ApiProperty } from '@nestjs/swagger';

export class SignInVeryfyDto {
  @ApiProperty()
  emailorphone: string;
}
