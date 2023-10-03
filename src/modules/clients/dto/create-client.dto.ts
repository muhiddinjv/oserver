
import {ClientType} from "../clienttype.enums";
import {ApiProperty} from "@nestjs/swagger";

export class CreateClientDto {
    @ApiProperty()
    shop_id: number;
    @ApiProperty()
    client_name: string;
    @ApiProperty()
    client_phone: string;
    @ApiProperty()
    address_id: number;
    @ApiProperty()
    clientgroup_id:number ;
    @ApiProperty()
    client_logo: string;
    @ApiProperty()
    client_contact_person: string;
    @ApiProperty()
    client_tin: string;
    @ApiProperty()
    client_account: string;
    @ApiProperty()
    client_company_name: string;
    @ApiProperty({enum:[1,2]})
    client_type: ClientType;
    @ApiProperty()
    client_status: boolean;
}
