import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { LoggingInterceptor } from './common/utils/logging.interceptor';
import { configService } from './common/config/config.service';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, {
    // logger: ['error', 'warn'],
    // bufferLogs: true,
    // snapshot: true,
  });
  app.enableCors();
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.setGlobalPrefix('/v1')
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (!configService.isProduction()) {
    const config = new DocumentBuilder()
      .setTitle('Ollio Market API')
      .setVersion('1.0')
      .addTag('auth')
      .addTag('users')
      .addTag('settings')
      .addTag('regions')
      .addTag('shop')
      .addTag('clients')
      .addTag('products')
      .addTag('files')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('rest', app, document);
  }


  await app.listen(Number(process.env.PORT));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
