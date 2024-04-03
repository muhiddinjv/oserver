import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District, Regions } from '../entities';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private districtRepo: Repository<District>,
  ) {}

  public async getSelectDistrict(id: number) {
    const region = await this.districtRepo.manager
      .getRepository(Regions)
      .findOne({ where: { id: id } })
      .then((data) => {
        return data.id;
      });
    return this.districtRepo.manager
      .getRepository(District)
      .find({ where: { region: region }, relations: ['region'] });
  }

  getAllDistricts() {
    return this.districtRepo.find({
      relations: ['region'],
      select: ['id', 'name'],
    });
  }

  public fillDataDistrict = async () => {
    const fs = require('fs');
    fs.readFile('data/districts.json', (err, data) => {
      if (err) throw err;
      let districts = JSON.parse(data);
      for (var ii in districts) {
        var id = districts[ii].id;
        var region_id = districts[ii].region_id;
        var name = districts[ii].name_uz;
        this.districtRepo.save([{ id: id, region: region_id, name: name }]);
      }
    });
  };
}
