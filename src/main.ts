import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ollio API Docs')
    .setDescription('Ollio API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://localhost:3000/', 'Local')
    .addServer('https://dev.ollio.uz/', 'Developer')
    .addServer('https://api.ollio.uz/', 'Production')
    .addGlobalParameters({
      name: 'bearer token',
      in: 'header'
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  await app.listen(3000);
}
bootstrap();
