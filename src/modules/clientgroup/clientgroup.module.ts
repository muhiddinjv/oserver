import { Module } from '@nestjs/common';
import { ClientgroupService } from './clientgroup.service';
import { ClientgroupController } from './clientgroup.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClientsGroup} from "./entities/clientgroup.entity";

@Module({
  imports:[TypeOrmModule.forFeature([ClientsGroup])],
  controllers: [ClientgroupController],
  providers: [ClientgroupService],
  exports:[TypeOrmModule]
})
export class ClientgroupModule {}
