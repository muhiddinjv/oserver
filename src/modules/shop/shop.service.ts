import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopDto } from './shop.dto';
import { Address, Shop, Shoptype } from '../entities';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepo: Repository<Shop>,
  ) {}

  public getAllShopList = async () => {
    return await this.shopRepo.find({ relations: ['shoptype', 'address'] });
  };

  public async getShop(id: number) {
    return await this.shopRepo.findOne({
      where: { id: id },
      relations: ['shoptype', 'address'],
    });
  }

  public createShop = async (shopDto: ShopDto) => {
    let shoptype_id, address_id, shop_id;

    const shoptype_rec = await this.shopRepo.manager
      .getRepository(Shoptype)
      .find({ where: { id: shopDto.shoptype } });
    shoptype_rec.map((data) => {
      return (shoptype_id = data.id);
    });

    const shop = new Shop();
    shop.shop_longtitude = shopDto.shop_longtitude;
    shop.shop_latitude = shopDto.shop_latitude;
    shop.owner_name = shopDto.owner_name;
    shop.shop_name = shopDto.shop_name;
    shop.phone = shopDto.phone;
    shop.shoptype = shoptype_id;

    const address_rec = await this.shopRepo.manager
      .getRepository(Address)
      .findBy({ address: shopDto.address });
    address_rec.map((data) => {
      return (address_id = data.id);
    });

    const shoprec = await this.shopRepo.save(shop);
    const address = new Address();
    address.shops = shoprec;
    address.address = shopDto.address;
    address.landmark = '';
    address.latitude = '0';
    address.longtitude = '0';
    await this.shopRepo.manager.getRepository(Address).save(address);

    return shoprec;
  };

  public updateShop = async (id: number, shopDto: ShopDto) => {
    let shoptype_id, address_id: any, shop_id;

    const shoptype_rec = await this.shopRepo.manager
      .getRepository(Shoptype)
      .find({ where: { id: shopDto.shoptype } });
    shoptype_rec.map((data) => {
      return (shoptype_id = data.id);
    });

    const shop = new Shop();
    shop.shop_longtitude = shopDto.shop_longtitude;
    shop.shop_latitude = shopDto.shop_latitude;
    shop.owner_name = shopDto.owner_name;
    shop.shop_name = shopDto.shop_name;
    shop.phone = shopDto.phone;
    shop.shoptype = shoptype_id;
    this.shopRepo.update({ id }, shop);

    const shoprec = await this.shopRepo.findOne({ where: { id: id } });

    const address_rec = await this.shopRepo.manager
      .getRepository(Address)
      .findBy({ address: shopDto.address });
    address_rec.map((data) => {
      const address = new Address();
      address.shops = shoprec;
      address.address = shopDto.address;
      address.landmark = '';
      address.latitude = '0';
      address.longtitude = '0';
      // this.shopRepo.manager.createQueryBuilder("address").update();
      // getRepository(Address).update({id},address);
    });

    return this.shopRepo.update({ id }, shop);
  };
}
