import { ApiProperty } from '@nestjs/swagger';
export class CreateRoleDto {

  @ApiProperty({
    description: "name",
    example: "name",
  })
  name: string;

  
  @ApiProperty({
    description: "user",
    example: "id",
  })
  user_id: string;
 
}
