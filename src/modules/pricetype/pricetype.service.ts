import { Injectable } from '@nestjs/common';
import { CreatePricetypeDto } from './dto/create-pricetype.dto';
import { UpdatePricetypeDto } from './dto/update-pricetype.dto';

@Injectable()
export class PricetypeService {
  create(createPricetypeDto: CreatePricetypeDto) {
    return 'This action adds a new pricetype';
  }

  findAll() {
    return `This action returns all pricetype`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pricetype`;
  }

  update(id: number, updatePricetypeDto: UpdatePricetypeDto) {
    return `This action updates a #${id} pricetype`;
  }

  remove(id: number) {
    return `This action removes a #${id} pricetype`;
  }
}
