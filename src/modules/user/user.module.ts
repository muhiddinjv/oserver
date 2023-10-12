import { Module } from '@nestjs/common';
import { UserModelDefinition } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([UserModelDefinition])],
})
export class UserModule {}
