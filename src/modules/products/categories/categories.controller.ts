import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
} from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { constants } from 'os';
import { CategoriesDto } from './categories.dto';
import { CategoriesService } from './categories.service';
@ApiTags('products')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesServ: CategoriesService) { }

  @ApiProperty({
    example: 0,
    description:
      "Do`kon id 0 dan farqi bo'lsa  usha do'kon bo'cha malumot chiqad.",
  })
  @Get(':shop_id')
  public getAllCategories(@Response() res, @Param('shop_id') id: number) {
    return this.categoriesServ
      .getCategories(id)
      .then((data) => {
        return res.send({
          success: true,
          data: data,
          message: 'Fetch All Record!!',
        });
      })
      .catch((error) => {
        return res.send({
          success: false,
          data: null,
          message: 'not record found!!!',
        });
      });
  }

  @Post()
  public async saveproduct(
    @Response() res,
    @Body() categoriesDto: CategoriesDto,
  ) {
    await this.categoriesServ
      .createCategories(categoriesDto)
      .then((data) => {
        return res.send({
          success: true,
          data: data,
          message: 'Created category!!!',
        });
      })
      .catch((err) => {
        return res.send({
          success: false,
          data: null,
          message: 'Not created category!!!',
        });
      });
  }

  @Get(':id')
  public getCategoryEdit(@Param('id') id: number) {
    return this.categoriesServ.getEditCategory(id);
  }

  @Delete(':id')
  public async deletCategory(@Param('id') id: number) {
    return await this.categoriesServ.deleteCategory(id);
  }

  @Put(':id')
  public async updateCategory(
    @Response() res,
    @Param('id') id: number,
    @Body() categroyDTO: CategoriesDto,
  ) {
    this.categoriesServ.updateCategory(id, categroyDTO).then((data) => {
      if (data) {
        return res.send({
          success: true,
          data: data,
          message: 'Update success!!!!',
        });
      } else {
        return res.send({
          success: false,
          data: [],
          message: 'Not update success!!!!',
        });
      }
    });
  }
}
