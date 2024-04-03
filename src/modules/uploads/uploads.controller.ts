import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Header,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileDto } from './file.dto';
import { LocalFileService } from './local.file.service';
import { LocalFileInterceptor } from './local.file.interceptor';

@ApiTags('file')
@Controller('uploads')
export class UploadsController {
  constructor(private fileService: LocalFileService) {}
  @Post('upload')
  @UseInterceptors(
    LocalFileInterceptor({
      fieldName: 'file',
      path: '/avatars',
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid image'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: Math.pow(1024, 2), // 1MB
      },
    }),
  )
  uploadFile(@Body() body: FileDto, @UploadedFile() file: Express.Multer.File) {
    return this.fileService.saveLocalFileData({
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @Get(':id')
  async getDatabaseFileById(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.fileService.getFileById(id);

    const stream = createReadStream(join(process.cwd(), file.path));

    response.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype,
    });
    return new StreamableFile(stream);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename="package.json"')
  getStaticFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
}
