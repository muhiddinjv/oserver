import { Module } from '@nestjs/common';
import { PricetypeService } from './pricetype.service';
import { PricetypeController } from './pricetype.controller';

@Module({
  controllers: [PricetypeController],
  providers: [PricetypeService],
})
export class PricetypeModule {}
