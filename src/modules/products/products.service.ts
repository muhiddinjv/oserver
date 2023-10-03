import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsDto } from './products.dto';
import { Products } from '../entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepo: Repository<Products>,
  ) {}

  public async getListProduct(){
    return await this.productRepo.find({relations:['categories','productgroup']});
  }
  public async createProduct(productDto: ProductsDto) {
    return await this.productRepo.save(productDto);
  }
}
