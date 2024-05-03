import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { CatalogsModule } from './modules/catalog/catalog.module';
import { TransfersModule } from './modules/transfers/transfers.module';
import { GoodsModule } from './modules/goods/goods.module';
import { BillsModule } from './modules/bills/bills.module';
import { RtGuard } from './modules/auth/guards/rt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
    CatalogsModule,
    GoodsModule,
    BillsModule,
    TransfersModule
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: RtGuard,
  }],
})

export class AppModule {}