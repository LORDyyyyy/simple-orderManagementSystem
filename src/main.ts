import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Config from './config/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Config.PORT);
}
bootstrap();
