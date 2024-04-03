import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductgroupDto } from './productgroup.dto';
import { ProductGroup, Shop } from '../../entities';

@Injectable()
export class ProductgroupService {
  constructor(
    @InjectRepository(ProductGroup)
    private productGroupRepo: Repository<ProductGroup>,
  ) {}

  public async getAllProductGroup() {
    return this.productGroupRepo.find({ relations: ['shop'] });
  }

  public async saveProductGroup(productgroupdto: ProductgroupDto) {
    let shop, result;

    await this.productGroupRepo.manager
      .getRepository(Shop)
      .find({ where: { shop_name: productgroupdto.shop } })
      .then((data) => {
        data.map((data) => {
          shop = data.id;
          result = this.productGroupRepo.save([
            {
              shop: shop,
              group_name: productgroupdto.group_name,
              isSctive: productgroupdto.isSctive,
            },
          ]);
        });
      });
    return result;
  }
}
