import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

const options = { cors: true };

async function bootstrap() {
  const app = await NestFactory.create(AppModule, options);
  // app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            field: error.property,
            text: Object.values(error.constraints).join(', '),
          })),
        );
      },
    }),
  );
  await app.listen(4000);
}

bootstrap();