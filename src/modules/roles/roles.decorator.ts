import { SetMetadata } from '@nestjs/common';

//store these roles within a database
export enum Role {
    Admin = 'admin',
    Wholesaler = 'wholesaler',
    Retailer = 'retailer',
    Customer = 'customer',
    Cashier = 'cashier',
    Loader = 'loader',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);