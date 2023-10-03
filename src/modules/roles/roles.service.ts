import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Roles, Permissions } from '../entities';
import {CreateRoleDto} from "./dto/create-role.dto";
import {UpdateRoleDto} from "./dto/update-role.dto";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private roleRepo: Repository<Roles>,
  ) { }

  async filldata() {
    const permissionRepo = this.roleRepo.manager.getRepository(Permissions);
    const permissions = await permissionRepo.find({});
    const permssionsAgent = await permissionRepo.findBy({
      name: In(['shop.view', 'region.view', 'district.view', 'address.view']),
    });
    let roles: any;
    if (this.roleRepo.exist()) {
      roles = this.roleRepo.save([
        {
          id: 1,
          role_name: 'SuperAdmin',
          role_title: 'Cупер админ',
          permission: permissions,
        },
        {
          id: 2,
          role_name: 'admin',
          role_title: 'Администратор',
          permission: permissions,
        },
        {
          id: 3,
          role_name: 'Seller',
          role_title: 'Продавец',
          permission: permissions,
        },
        {
          id: 4,
          role_name: 'Provider',
          role_title: 'Доставщик',
          permission: permissions,
        },
        {
          id: 5,
          role_name: 'Agent',
          role_title: 'Агент',
          permission: permssionsAgent,
        },
        {
          id: 6,
          role_name: 'Operator',
          role_title: 'Опетарор',
          permission: permissions,
        },
        {
          id: 7,
          role_name: 'Caisher',
          role_title: 'Кассир',
          permission: permissions,
        },
        {
          id: 8,
          role_name: 'Partner',
          role_title: 'Партнёр',
          permission: permissions,
        },
        {
          id: 9,
          role_name: 'Supervisor',
          role_title: 'Супервайзер',
          permission: permissions,
        },
        {
          id: 10,
          role_name: 'Manager',
          role_title: 'Менеджер',
          permission: permissions,
        },
        {
          id: 11,
          role_name: 'Forwarder',
          role_title: 'Экспедитор',
          permission: permissions,
        },
        {
          id: 12,
          role_name: 'Merchandiser',
          role_title: 'Мерчандайзер',
          permission: permissions,
        },
        {
          id: 13,
          role_name: 'Account',
          role_title: 'Бухгалтер',
          permission: permissions,
        },
        {
          id: 14,
          role_name: 'Warehouse',
          role_title: 'Складчик',
          permission: permissions,
        },
      ]);
    }
    return roles;
  };

  async findAll() {
    return await this.roleRepo.find({relations: ['permission']});
  }

  async findOne(id: number) {
    return await this.roleRepo.findOne({ where: { id:id }, relations: ['permission'] });
  }

  async create(roles: CreateRoleDto): Promise<Roles> {
    const newRole = this.roleRepo.create(roles);
    newRole.permission = await this.roleRepo.manager.getRepository(Permissions).find();
    return await this.roleRepo.save(newRole);
  }

  async update(id: number, roles: UpdateRoleDto): Promise<Roles> {
    await this.roleRepo.update(id, roles);
    return await this.roleRepo.findOne({ where: { id }, relations: ['permission'] });
  }

  async delete(id: number): Promise<void> {
    await this.roleRepo.delete({id:id});
  }
}
