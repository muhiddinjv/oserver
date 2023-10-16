import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComponentsController } from './components.controller';
import { Components, ComponentsSchema } from './components.schema';
import { ComponentsService } from './components.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Components.name, schema: ComponentsSchema },
    ]),
  ],
  controllers: [ComponentsController],
  providers: [ComponentsService],
  exports: [ComponentsService],
})
export class ComponentsModule {}
