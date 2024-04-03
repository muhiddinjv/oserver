import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandsDto } from './brands.dto';
import { Brands, Shop } from '../../entities';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brands)
    private brandRepo: Repository<Brands>,
  ) {}

  public getAllListBrand = async () => {
    return await this.brandRepo.find({ relations: ['shop'] });
  };

  public createBrand = async (brandsDto: BrandsDto) => {
    let shop, result;
    await this.brandRepo.manager
      .getRepository(Shop)
      .find({ where: { id: brandsDto.shop_id } })
      .then((data) => {
        data.map((data) => {
          shop = data.id;
          result = this.brandRepo.save([
            {
              shop: shop,
              brand_name: brandsDto.brand_name,
              brand_status: brandsDto.brand_status,
              brand_image: brandsDto.brand_image,
            },
          ]);
        });
      });
    return result;
  };

  public getEditBrand = async (id: number) => {
    return await this.brandRepo.find({ where: { id: id } });
  };

  public updateBrand = async (id: number, brandsDto: BrandsDto) => {
    let shop, result;
    await this.brandRepo.manager
      .getRepository(Shop)
      .find({ where: { id: brandsDto.shop_id } })
      .then((data) => {
        data.map((data) => {
          shop = data.id;
          result = this.brandRepo.update(
            { id },
            {
              shop: shop,
              brand_name: brandsDto.brand_name,
              brand_status: brandsDto.brand_status,
              brand_image: brandsDto.brand_image,
            },
          );
        });
      });
    return result;
  };

  public deleteBrand = async (id: number) => {
    return await this.brandRepo.delete({ id });
  };
}
