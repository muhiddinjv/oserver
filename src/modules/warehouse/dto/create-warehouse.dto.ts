import {StoreType} from "../../shop/storetype.enums";
import {Warehouse} from "../entity/warehouse.entity";
import {ApiProperty, ApiTags} from "@nestjs/swagger";


export class CreateWarehouseDto{
    @ApiProperty()
    name: string;
    @ApiProperty()
    shop_id: number;
    @ApiProperty()
    is_default: number;
    @ApiProperty()
    status: number;
    @ApiProperty()
    storetype: StoreType;
}
