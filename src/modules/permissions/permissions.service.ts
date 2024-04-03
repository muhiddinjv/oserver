import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permissions, Roles } from '../entities';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permissions)
    private readonly permissionRepo: Repository<Permissions>,
  ) { }

  async filldata() {
    if (this.permissionRepo.exist()) {
      return await this.permissionRepo
        .save([
          { id: 1, name: 'user.create' },
          { id: 2, name: 'user.view' },
          { id: 3, name: 'user.update' },
          { id: 4, name: 'user.save' },
          { id: 5, name: 'user.edit' },
          { id: 6, name: 'user.delete' },
          { id: 7, name: 'role.create' },
          { id: 8, name: 'role.save' },
          { id: 9, name: 'role.view' },
          { id: 10, name: 'role.update' },
          { id: 11, name: 'role.edit' },
          { id: 12, name: 'role.delete' },
          { id: 13, name: 'permission.create' },
          { id: 14, name: 'permission.save' },
          { id: 15, name: 'permission.update' },
          { id: 16, name: 'permission.view' },
          { id: 17, name: 'permission.edit' },
          { id: 18, name: 'permission.delete' },
          { id: 19, name: 'shop.create' },
          { id: 20, name: 'shop.save' },
          { id: 21, name: 'shop.view' },
          { id: 22, name: 'shop.update' },
          { id: 23, name: 'shop.edit' },
          { id: 24, name: 'shop.delete' },
          { id: 25, name: 'shoptype.create' },
          { id: 26, name: 'shoptype.save' },
          { id: 27, name: 'shoptype.view' },
          { id: 28, name: 'shoptype.update' },
          { id: 29, name: 'shoptype.edit' },
          { id: 30, name: 'shoptype.delete' },
          { id: 31, name: 'region.create' },
          { id: 32, name: 'region.save' },
          { id: 33, name: 'region.view' },
          { id: 34, name: 'region.update' },
          { id: 35, name: 'region.edit' },
          { id: 36, name: 'region.delete' },
          { id: 37, name: 'district.create' },
          { id: 38, name: 'district.save' },
          { id: 39, name: 'district.view' },
          { id: 40, name: 'district.update' },
          { id: 41, name: 'district.edit' },
          { id: 42, name: 'district.delete' },
          { id: 43, name: 'address.create' },
          { id: 44, name: 'address.save' },
          { id: 45, name: 'address.view' },
          { id: 46, name: 'address.edit' },
          { id: 47, name: 'address.update' },
          { id: 48, name: 'address.delete' },
          { id: 49, name: 'brand.view' },
          { id: 50, name: 'brand.save' },
          { id: 51, name: 'brand.edit' },
          { id: 52, name: 'brand.update' },
          { id: 53, name: 'brand.delete' },
          { id: 54, name: 'category.create' },
          { id: 55, name: 'category.save' },
          { id: 56, name: 'category.update' },
          { id: 57, name: 'category.view' },
          { id: 58, name: 'category.edit' },
          { id: 59, name: 'category.delete' },
          { id: 60, name: 'product.create' },
          { id: 61, name: 'product.view' },
          { id: 62, name: 'product.save' },
          { id: 63, name: 'product.edit' },
          { id: 64, name: 'product.delete' },
          { id: 65, name: 'productgroup.create' },
          { id: 66, name: 'productgroup.save' },
          { id: 67, name: 'productgroup.view' },
          { id: 68, name: 'productgroup.update' },
          { id: 69, name: 'productgroup.edit' },
          { id: 70, name: 'productgroup.delete' },
          { id: 71, name: 'productprice.create' },
          { id: 72, name: 'productprice.save' },
          { id: 73, name: 'productprice.view' },
          { id: 74, name: 'productprice.update' },
          { id: 75, name: 'productprice.edit' },
          { id: 76, name: 'productprice.delete' },
          { id: 77, name: 'producttype.create' },
          { id: 78, name: 'producttype.save' },
          { id: 79, name: 'producttype.view' },
          { id: 80, name: 'producttype.update' },
          { id: 81, name: 'producttype.edit' },
          { id: 82, name: 'producttype.delete' },
          { id: 83, name: 'productwarehouse.create' },
          { id: 84, name: 'productwarehouse.save' },
          { id: 85, name: 'productwarehouse.view' },
          { id: 86, name: 'productwarehouse.update' },
          { id: 87, name: 'productwarehouse.edit' },
          { id: 89, name: 'productwarehouse.delete' },
          { id: 90, name: 'warehouse.create' },
          { id: 91, name: 'warehouse.save' },
          { id: 92, name: 'warehouse.view' },
          { id: 93, name: 'warehouse.update' },
          { id: 94, name: 'warehouse.edit' },
          { id: 95, name: 'warehouse.delete' },
          { id: 96, name: 'client.create' },
          { id: 97, name: 'client.save' },
          { id: 98, name: 'client.view' },
          { id: 100, name: 'client.update' },
          { id: 110, name: 'client.edit' },
          { id: 111, name: 'client.delete' },
          { id: 112, name: 'clientgroup.create' },
          { id: 113, name: 'clientgroup.save' },
          { id: 114, name: 'clientgroup.view' },
          { id: 115, name: 'clientgroup.update' },
          { id: 116, name: 'clientgroup.edit' },
          { id: 117, name: 'clientgroup.delete' },
        ])
        .then((data) => { });
    }
  };

  async findAll() {
    return await this.permissionRepo.find({ relations: ['role'] });
  };

  async findOne(id: number) {
    return await this.permissionRepo.findOne({ where: { id: id }, relations: ['role'] });
  }

  async create(permissions: CreatePermissionDto): Promise<Permissions> {
    const newPermission = this.permissionRepo.create(permissions);
    newPermission.role = await this.permissionRepo.manager.getRepository(Roles).find();
    return await this.permissionRepo.save(newPermission);
  }

  async update(id: number, permssions: UpdatePermissionDto): Promise<Permissions> {
    await this.permissionRepo.update(id, permssions);
    return await this.permissionRepo.findOne({ where: { id }, relations: ['role'] });
  }

  async delete(id: number): Promise<void> {
    await this.permissionRepo.delete({ id: id });
  }
}
