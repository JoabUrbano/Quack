import { NestFactory } from '@nestjs/core';
import { FidelityModule } from './fidelity.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(FidelityModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(process.env.port ?? 3003);
}
bootstrap();
