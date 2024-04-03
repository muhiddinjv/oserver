import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UnitService } from './units.service';
import { UnitsDto } from './units.dto';

@ApiTags('products')
@Controller('units')
export class UnitsController {
  constructor(private unitServ: UnitService) {}

  @Get()
  public getListUnit() {
    return this.unitServ.getAllUnits();
  }

  @Post()
  public saveUnit(@Body() unitDto: UnitsDto) {
    return this.unitServ.insertUnit(unitDto);
  }

  @Patch(':id')
  public updateUnit(
    @Param('id', ParseIntPipe) id: number,
    @Body() unitDtom: UnitsDto,
  ) {
    return this.unitServ.updateUnit(id, unitDtom);
  }

  @Delete(':id')
  public deleteUnit(@Param('id', ParseIntPipe) id: number) {
    return this.unitServ.deleteUnit(id);
  }
}
