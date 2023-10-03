import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesDto } from './categories.dto';
import { Categories, Shop } from '../../entities';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepo: Repository<Categories>,
  ) {}

  public async getCategories(id: number) {
    let shop;
    if (id != 0) {
      shop = await this.categoriesRepo.manager
        .getRepository(Shop)
        .findOne({ where: { id: id } })
        .then((data) => {
          return data.id;
        });
      return await this.categoriesRepo.find({
        where: { shop: shop },
        relations: ['shop'],
      });
    } else {
      return await this.categoriesRepo.find({ relations: ['shop'] });
    }
  }

  public createCategories = async (categoriesDto: CategoriesDto) => {
    let shop, result;
    await this.categoriesRepo.manager
      .getRepository(Shop)
      .find({ where: { id: categoriesDto.shop_id } })
      .then((data) => {
        data.map((data) => {
          shop = data.id;
          result = this.categoriesRepo.save([
            {
              category_name: categoriesDto.category_name,
              category_image: categoriesDto.categories_image,
              category_status: categoriesDto.category_status,
              category_sort_order: categoriesDto.category_sort_order,
              parent_id: categoriesDto.parent_id,
              shop: shop,
            },
          ]);
        });
      });
    return result;
  };

  public async deleteCategory(id: number) {
    return await this.categoriesRepo
      .createQueryBuilder('categories')
      .delete()
      .from(Categories)
      .where('id=:id', { id: id })
      .execute();
  }

  public async getEditCategory(id: number) {
    return this.categoriesRepo.findOne({
      where: { id: id },
      relations: ['shop'],
    });
  }

  public async updateCategory(id: number, categoriesDto: CategoriesDto) {
    let shop, result;
    await this.categoriesRepo.manager
      .getRepository(Shop)
      .find({ where: { id: categoriesDto.shop_id } })
      .then((data) => {
        data.map((data) => {
          shop = data.id;
          result = this.categoriesRepo.update(
            { id },
            {
              category_name: categoriesDto.category_name,
              category_image: categoriesDto.categories_image,
              category_status: categoriesDto.category_status,
              category_sort_order: categoriesDto.category_sort_order,
              parent_id: categoriesDto.parent_id,
              shop: shop,
            },
          );
        });
      });
    return result;
  }
}
