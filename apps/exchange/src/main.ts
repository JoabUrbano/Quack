import { NestFactory } from '@nestjs/core';
import { ExchangeModule } from './exchange.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ExchangeModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );


  await app.listen(process.env.port ?? 3002);
}
bootstrap();
