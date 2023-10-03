import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Regions} from "./regions.entity";
import {District} from "./districts.entity";
import {RegionsController} from "./regions.controller";
import {RegionsService} from "./regions.service";
import {DistrictsService} from "./districts.service";


@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Regions,District])],
  controllers: [RegionsController],
  providers: [RegionsService,DistrictsService],
  exports: [TypeOrmModule],
})
export class RegionsModule {
  constructor(private regionService: RegionsService) {}
}
