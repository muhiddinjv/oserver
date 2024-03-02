import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ItemsModule } from './modules/items_global/items_global.module';
import { ItemsShopModule } from './modules/items_shop/items_shop.module';
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
    ShopsModule,
    ItemsModule,
    ItemsShopModule,
  ],
  providers: [
    {
    provide: APP_GUARD,
    useClass: AuthGuard,
    }
  ],
})

export class AppModule {}