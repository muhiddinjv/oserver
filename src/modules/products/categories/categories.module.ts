import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Categories} from "./categories.entity";
import {CategoriesController} from "./categories.controller";
import {CategoriesService} from "./categories.service";


@Module({
    imports:[TypeOrmModule.forFeature([Categories])],
    controllers:[CategoriesController],
    providers:[CategoriesService],
    exports:[TypeOrmModule],
})
export class CategoriesModule {}
