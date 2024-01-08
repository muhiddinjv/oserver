import { ApiProperty } from '@nestjs/swagger';
export class CreatePermitDto {

    @ApiProperty({
        description: `name`,
        example: "name",
    })
    name: string;
  
    @ApiProperty({
        description: `role_id`,
        example: "Id",
    })
    role_id: string;
    
    @ApiProperty({
        description: `PermissiocatgoryId`,
        example: "Id",
    })
    PermissiocatgoryId: string;
}
