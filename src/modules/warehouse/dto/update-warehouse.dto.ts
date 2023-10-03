import {CreateWarehouseDto} from "./create-warehouse.dto";
import {PartialType} from "@nestjs/swagger";

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto){}
