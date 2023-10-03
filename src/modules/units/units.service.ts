import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitsDto } from './units.dto';
import { Units, Shop } from '../entities';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Units)
    private unirRepo: Repository<Units>,
  ) {}

  public getAllUnits() {
    return this.unirRepo.find({ relations: ['shop'] });
  }

  public async insertUnit(unitDto: UnitsDto) {
    let shop, result;

    await this.unirRepo.manager
      .getRepository(Shop)
      .find({ where: { shop_name: unitDto.shop } })
      .then((data) => {
        data.map((data) => {
          return (shop = data.id);
        });
      });
    result = this.unirRepo.save([
      {
        shop: shop,
        unit_name: unitDto.unit_name,
        short_name: unitDto.short_name,
        base_unit: unitDto.base_unit,
        operator: unitDto.operator,
        operator_value: unitDto.operator_value,
        is_active: unitDto.is_active,
      },
    ]);
    return result;
  }

  public async updateUnit(id: number, unitDto: UnitsDto) {
    let shop, result;

    await this.unirRepo.manager
      .getRepository(Shop)
      .find({ where: { shop_name: unitDto.shop } })
      .then((data) => {
        data.map((data) => {
          return (shop = data.id);
        });
      });
    result = this.unirRepo.update(
      { id: id },
      {
        shop: shop,
        unit_name: unitDto.unit_name,
        short_name: unitDto.short_name,
        base_unit: unitDto.base_unit,
        operator: unitDto.operator,
        operator_value: unitDto.operator_value,
        is_active: unitDto.is_active,
      },
    );
    return result;
  }

  public async deleteUnit(id: number) {
    return this.unirRepo.delete({ id: id });
  }
}
