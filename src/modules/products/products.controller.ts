import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductsDto } from './products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productServ: ProductsService) {}

  @Get('/list')
  public getAllProductList() {
      return this.productServ.getListProduct()
  }

  @Post('/save')
  public saveProduct(@Body() productDto: ProductsDto) {
    return this.productServ.createProduct(productDto);
  }
}
