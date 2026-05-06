import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Глобальна валідація (щоб працювали DTO)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // 2. Підключаємо твій новий фільтр помилок
  app.useGlobalFilters(new HttpExceptionFilter());

  // 3. Підключаємо твій новий інтерцептор (обгортка {data, statusCode})
  app.useGlobalInterceptors(new TransformInterceptor());

  // 4. Налаштування Swagger
  const config = new DocumentBuilder()
    .setTitle('Minishop API')
    .setDescription('Документація API для міні-магазину')
    .setVersion('1.0')
    .addBearerAuth() // Додає можливість вводити JWT токен у Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Слухаємо порт 3000
  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
  console.log(`Swagger UI available at: http://localhost:3000/api/docs`);
}
bootstrap();