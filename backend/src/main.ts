import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with credentials and allow all origins
  // alllowing all due to time constraints
  app.enableCors({
    origin: true, // This allows all origins
    credentials: true,
  });

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // Use cookie parser
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
