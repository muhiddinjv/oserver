import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ItemsModule } from './modules/global_items/global_items.module';
import { ShopItemsModule } from './modules/shop_items/shop_items.module';
import { ShopsModule } from './modules/shops/shops.module';
import { TransfersModule } from './modules/transfers/transfers.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
    TransfersModule,
    CategoriesModule,
    ShopsModule,
    ItemsModule,
    ShopItemsModule,
  ],
  providers: [
    {
    provide: APP_GUARD,
    useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
