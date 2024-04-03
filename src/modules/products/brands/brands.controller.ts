import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Response} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {BrandsService} from "./brands.service";
import {BrandsDto} from "./brands.dto";

@ApiTags('products')
@Controller('brands')
export class BrandsController {

    constructor(private brandServ:BrandsService) {
    }

    @Get()
    public getAllList(){
        return this.brandServ.getAllListBrand();
    }

    @Post()
    public async saveBrand(@Body() brandDto:BrandsDto){
        return this.brandServ.createBrand(brandDto);
    }

    @Get(':id')
    public async getBrand(@Param('id',ParseIntPipe) id:number){
        return this.brandServ.getEditBrand(id);
    }

    @Put(':id')
    public async updateBrand(@Response() res,@Param('id',ParseIntPipe) id:number,@Body() brandDto:BrandsDto){
        this.brandServ.updateBrand(id,brandDto).then((data)=>{
            if (data.affected){
                return res.send({success:true,message:"Updated!!!"})
            } else {
                return res.send({success:false,message:"Not updated!!!"})
            }
        }).catch((error)=>{
            return res.send({success:false,message:error})
        })

    }

    @Delete(':id')
    public async deleteBrand(@Param('id',ParseIntPipe) id:number){
        this.brandServ.deleteBrand(id);
        return
    }
}
