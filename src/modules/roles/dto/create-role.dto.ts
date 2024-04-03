import {Column, JoinTable, ManyToMany} from "typeorm";
import {Users} from "../../users/entities/users.entity";
import {Permissions} from "../../permissions/entities/permissions.entity";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto{
    @ApiProperty()
    role_name:string;
    @ApiProperty()
    role_title:string;
}
