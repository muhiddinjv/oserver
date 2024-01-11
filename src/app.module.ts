import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ItemsModule } from './modules/items/items.module';
import { VariantsModule } from './modules/variants/variants.module';
import { ComponentsModule } from './modules/components/components.module';
import { ShopsModule } from './modules/shops/shops.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermitsModule } from './modules/permits/permits.module';
import { APP_GUARD } from '@nestjs/core';
import { AbilitiesGuard } from './modules/auth/ability/ability.guard';
import { AbilityModule } from './modules/auth/ability/ability.module';
import { SmsModule } from './modules/sms/sms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ShopsModule,
    ItemsModule,
    VariantsModule,
    ComponentsModule,
    RolesModule,
    PermitsModule,
    AbilityModule,
    SmsModule
  ],
   
  providers: [
    {
    provide: APP_GUARD,
    useClass:AbilitiesGuard
    }
  ],
})
export class AppModule {}
