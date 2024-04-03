import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  Response,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShopService } from './shop.service';
import { ShopDto } from './shop.dto';
import {ShoptypeService} from "../shoptype/shoptype.service";


@ApiTags('shops')
@Controller('shops')
export class ShopController {
  constructor(
    private shopServ: ShopService,
    private shoptypeServ: ShoptypeService,
  ) {}

  @Get()
  public shopList() {
    return this.shopServ.getAllShopList();
  }

  @Get(':id')
  public shopEdit(@Response() res, @Param('id') id: number) {
    return this.shopServ
      .getShop(id)
      .then((data) => {
        if (data) {
          return res.send({
            success: true,
            data: data,
            message: 'Found Record!!!!',
          });
        } else {
          return res.send({
            success: false,
            data: null,
            message: 'Not found record !!!!',
          });
        }
      })
      .catch((error) => {
        return res.send({
          success: false,
          data: null,
          message: 'Not found record !!!!',
        });
      });
  }

  @Post()
  public saveShop(@Response() res, @Body() shopDto: ShopDto) {
    return this.shopServ
      .createShop(shopDto)
      .then((data) => {
        if (data !== null) {
          return res
            .status(200)
            .send({ status: true, message: 'Shop created success !!!' });
        } else {
          return res
            .status(200)
            .send({ status: false, message: 'Not shop created success !!!' });
        }
      })
      .catch((error) => {
        return res.status(200).send({ status: false, message: error.message });
      });
  }

  @Put(':id')
  public updateShop(
    @Response() res,
    @Param('id', ParseIntPipe) id: number,
    @Body() shopDto: ShopDto,
  ) {
    return this.shopServ
      .updateShop(id, shopDto)
      .then((data) => {
        if (data.affected == 1) {
          return res.send({
            status: true,
            message: 'Shop created success !!!',
          });
        } else {
          return res.send({
            status: false,
            message: 'Not shop created success !!!',
          });
        }
      })
      .catch((error) => {
        return res.send({ status: false, message: error.message });
      });
  }

  @Get('/types')
  public shoptypeList() {
    return this.shoptypeServ.findAll();
  }

  @Delete('/types/:id')
  public deleteShopType(@Res() res, @Param('id', ParseIntPipe) id: number) {
    return this.shoptypeServ
      .remove(id)
      .then((data) => {
        if (data.affected === 1) {
          return res
            .status(200)
            .send({ success: true, message: 'Affected row deleted!!!' });
        } else {
          return res
            .status(200)
            .send({ success: true, message: 'Not affected row deleted!!!' });
        }
      })
      .catch((error) => {
        return res.status(200).send({ success: true, message: error.message });
      });
  }
}
