import { NestFactory } from '@nestjs/core';
import { ExchangeModule } from './exchange.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ExchangeModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use(cookieParser());


  await app.listen(process.env.port ?? 3002);
}
bootstrap();
