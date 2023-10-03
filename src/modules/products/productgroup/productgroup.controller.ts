import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductgroupService } from './productgroup.service';
import { ProductgroupDto } from './productgroup.dto';

@ApiTags('products')
@Controller('productgroups')
export class ProductgroupController {
  constructor(private productgroupServ: ProductgroupService) {}

  @Get()
  public getAllProductList() {
    return this.productgroupServ.getAllProductGroup();
  }

  @Post()
  public saveProductGroup(@Body() productGroupDto: ProductgroupDto) {
    return this.productgroupServ.saveProductGroup(productGroupDto);
  }
}
