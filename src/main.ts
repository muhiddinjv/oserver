import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const options = { cors: true };

async function bootstrap() {
  const app = await NestFactory.create(AppModule, options);
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  await app.listen(4000);
}

bootstrap();