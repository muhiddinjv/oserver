import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ItemsModule } from './modules/items_global/items_global.module';
import { ItemsShopModule } from './modules/items_shop/items_shop.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
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