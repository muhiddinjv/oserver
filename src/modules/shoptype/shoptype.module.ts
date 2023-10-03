import { Module } from '@nestjs/common';
import { ShoptypeService } from './shoptype.service';
import { ShoptypeController } from './shoptype.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Shoptype} from "./entities/shoptype.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Shoptype])],
  controllers: [ShoptypeController],
  providers: [ShoptypeService],
})
export class ShoptypeModule {}
