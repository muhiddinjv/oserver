import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VariantsController } from './variants.controller';
import { Variants, VariantsSchema } from './variants.schema';
import { VariantsService } from './variants.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Variants.name, schema: VariantsSchema },
    ]),
  ],
  controllers: [VariantsController],
  providers: [VariantsService],
  exports: [VariantsService],
})
export class VariantsModule {}
