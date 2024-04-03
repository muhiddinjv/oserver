import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const options = { cors: true };

async function bootstrap() {
  const app = await NestFactory.create(AppModule, options);
  await app.listen(3000);
}

bootstrap();