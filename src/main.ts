import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // Strip properties that do not have decorators in the DTO
      // forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
