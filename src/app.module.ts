import * as Joi from '@hapi/joi';
import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './common/middleware/LoggerMiddleware';

import { DatabaseModule } from './database/database.module';

import { ProductgroupModule } from './modules/products/productgroup/productgroup.module';
import { ProductpriceModule } from './modules/products/productprice/productprice.module';
import { CategoriesModule } from './modules/products/categories/categories.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { BrandsModule } from './modules/products/brands/brands.module';
import { LocalFileModule } from './modules/uploads/local.file.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ProductsModule } from './modules/products/products.module';
import { RegionsModule } from './modules/regions/regions.module';
import { ShoptypeModule } from './modules/shoptype/shoptype.module';
import { UnitsModule } from './modules/units/units.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { ShopModule } from './modules/shop/shop.module';
import { ProductwarehouseModule } from './modules/productwarehouse/productwarehouse.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';

import { SettingsController } from './modules/settings/settings.controller';
import { RegionsController } from './modules/regions/regions.controller';
import { UsersController } from './modules/users/users.controller';
import { RolesController } from './modules/roles/roles.controller';
import { ProductsController } from './modules/products/products.controller';
import { CategoriesController } from './modules/products/categories/categories.controller';
import { ShopController } from './modules/shop/shop.controller';
import { BrandsController } from './modules/products/brands/brands.controller';
import { ProductgroupController } from './modules/products/productgroup/productgroup.controller';
import { UnitsController } from './modules/units/units.controller';
import { PermissionsController } from './modules/permissions/permissions.controller';
import { ProductpriceController } from './modules/products/productprice/productprice.controller';
import { WarehouseController } from './modules/warehouse/warehouse.controller';

import { PermissionsService } from './modules/permissions/permissions.service';
import { DistrictsService } from './modules/regions/districts.service';
import { RegionsService } from './modules/regions/regions.service';
import { UsersService } from './modules/users/users.service';
import { RolesService } from './modules/roles/roles.service';
import { SettingsService } from './modules/settings/settings.service';
import { ProductsService } from './modules/products/products.service';
import { CategoriesService } from './modules/products/categories/categories.service';
import { ProductgroupService } from './modules/products/productgroup/productgroup.service';
import { BrandsService } from './modules/products/brands/brands.service';
import { ShopService } from './modules/shop/shop.service';
import { UnitService } from './modules/units/units.service';
import { PricetypeService } from './modules/products/pricetype.service';
import { ShoptypeService } from "./modules/shoptype/shoptype.service";
import { WarehouseService } from './modules/warehouse/warehouse.service';
import { AuthService } from './modules/auth/auth.service';
import { LocalFileService } from './modules/uploads/local.file.service';
import { UploadsController } from './modules/uploads/uploads.controller';
import { PriceService } from "./modules/price/price.service";
import { ProductpriceService } from './modules/products/productprice/productprice.service';

import { LocalFile } from "./modules/uploads/local.file.entity";
import { ClientsService } from "./modules/clients/clients.service";
import { ClientsController } from "./modules/clients/clients.controller";
import { ClientsModule } from "./modules/clients/clients.module";
import { ClientgroupController } from "./modules/clientgroup/clientgroup.controller";
import { ClientgroupService } from "./modules/clientgroup/clientgroup.service";
import { ClientgroupModule } from "./modules/clientgroup/clientgroup.module";
import { PassportModule } from '@nestjs/passport';
import { GoogleModule } from './modules/auth/google/google.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                POSTGRES_DATABASE: Joi.string().required(),
                PORT: Joi.number(),
            }),
        }),
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                UPLOADED_FILES_DESTINATION: Joi.string().required(),
            }),
        }),
        PassportModule.register({ session: true }),
        TypeOrmModule.forFeature([LocalFile]),
        GoogleModule,
        DatabaseModule,
        SettingsModule,
        RegionsModule,
        PermissionsModule,
        UsersModule,
        RolesModule,
        CategoriesModule,
        ShoptypeModule,
        ShopModule,
        BrandsModule,
        ProductgroupModule,
        ProductsModule,
        UnitsModule,
        LocalFileModule,
        ProductpriceModule,
        WarehouseModule,
        ProductwarehouseModule,
        ClientsModule,
        ClientgroupModule,
    ],
    controllers: [
        SettingsController,
        RegionsController,
        UsersController,
        RolesController,
        CategoriesController,
        ShopController,
        BrandsController,
        ProductgroupController,
        ProductsController,
        UnitsController,
        PermissionsController,
        UploadsController,
        ProductpriceController,
        WarehouseController,
        ClientsController,
        ClientgroupController,
    ],
    providers: [
        SettingsService,
        RegionsService,
        PermissionsService,
        RolesService,
        UsersService,
        DistrictsService,
        CategoriesService,
        BrandsService,
        ProductgroupService,
        PriceService,
        ShopService,
        UnitService,
        PricetypeService,
        ShoptypeService,
        ProductsService,
        JwtService,
        AuthService,
        LocalFileService,
        ProductpriceService,
        WarehouseService, ClientsService, ClientgroupService],
})
export class AppModule implements NestModule {
    constructor(
        private permissionserv: PermissionsService,
        private roleServ: RolesService,
        private regionServ: RegionsService,
        private distServ: DistrictsService,
        private userServ: UsersService,
    ) {
        regionServ.fillDataRegion();
        // distServ.fillDataDistrict();
        permissionserv.filldata();
        roleServ.filldata();
        userServ.fillUserData();
    }

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({ path: 'cats', method: RequestMethod.GET });
    }

    // configure(consumer:MiddlewareConsumer){
    //     consumer.
    //         apply(LoggerMiddleware)
    //         .forRoutes({path:'cats',method:RequestMethod.GET})
    //
    // }
}
