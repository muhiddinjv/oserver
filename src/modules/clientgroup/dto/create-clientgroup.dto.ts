import {Column, OneToMany} from "typeorm";
import {Clients} from "../../clients/entities/clients.entity";
import {ApiProperty} from "@nestjs/swagger";

export class CreateClientgroupDto {

    @ApiProperty({type:String})
    client_group_name: string;

    @ApiProperty()
    client_group_status: boolean;
}
