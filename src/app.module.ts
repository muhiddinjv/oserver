import * as Joi from '@hapi/joi';
import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
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
import { PermissionsService } from './modules/permissions/permissions.service';
import { DistrictsService } from './modules/regions/districts.service';
import { RegionsService } from './modules/regions/regions.service';
import { UsersService } from './modules/users/users.service';
import { RolesService } from './modules/roles/roles.service';
import { LocalFile } from "./modules/uploads/local.file.entity";
import { ClientsModule } from "./modules/clients/clients.module";
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
        ClientgroupModule
    ]
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
