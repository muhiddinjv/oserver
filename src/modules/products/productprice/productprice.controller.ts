import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductpriceDto } from './productprice.dto';
import { ProductpriceService } from './productprice.service';

@ApiTags('products')
@Controller('productprices')
export class ProductpriceController {
  constructor(private productpriceServ: ProductpriceService) {}

  @Get()
  public async getAllProductPrice() {
    return this.productpriceServ.getProductPriceList();
  }

  @Post()
  public async saveProductPrice(@Body() productpricedto: ProductpriceDto) {
    return this.productpriceServ.saveProductPrice(productpricedto);
  }

  @Patch(':id')
  public async updatePriceProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() productpriceDto: ProductpriceDto,
  ) {
    return this.productpriceServ.updateProductPrice(id, productpriceDto);
  }

  @Delete(':id')
  public async deletePriceProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productpriceServ.deleteProductPrice(id);
  }
}
