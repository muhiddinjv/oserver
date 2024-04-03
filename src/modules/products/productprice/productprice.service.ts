import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductpriceDto } from './productprice.dto';
import { ProductPrice } from '../../entities';

@Injectable()
export class ProductpriceService {
  constructor(
    @InjectRepository(ProductPrice)
    private productpriceServ: Repository<ProductPrice>,
  ) {}

  public async getProductPriceList() {
    return await this.productpriceServ.find({});
  }

  public async saveProductPrice(productpriceDto: ProductpriceDto) {
    return await this.productpriceServ.save(productpriceDto);
  }

  public async updateProductPrice(
    id: number,
    productpriceDto: ProductpriceDto,
  ) {
    return await this.productpriceServ.update({ id: id }, productpriceDto);
  }

  public async deleteProductPrice(id: number) {
    return await this.productpriceServ.delete({ id: id });
  }
}
