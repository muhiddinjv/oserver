import {ApiProperty} from "@nestjs/swagger";
import {Column} from "typeorm";

export class CategoriesDto {

    @ApiProperty()
    shop_id:number;

    @ApiProperty()
    parent_id:number;

    @ApiProperty()
    categories_image:string;

    @ApiProperty()
    category_name: string;

    @ApiProperty()
    category_status: boolean;

    @ApiProperty()
    category_sort_order: number;

}
