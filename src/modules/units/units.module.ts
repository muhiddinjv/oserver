import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitService } from './units.service';
import { UnitsController } from './units.controller';
import { Units } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Units])],
  controllers: [UnitsController],
  providers: [UnitService],
  exports: [TypeOrmModule],
})
export class UnitsModule {}
