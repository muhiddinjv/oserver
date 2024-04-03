import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductgroupService } from './productgroup.service';
import { ProductgroupController } from './productgroup.controller';
import { ProductGroup } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProductGroup])],
  controllers: [ProductgroupController],
  providers: [ProductgroupService],
  exports: [TypeOrmModule],
})
export class ProductgroupModule {}
