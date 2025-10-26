import { NestFactory } from '@nestjs/core';
import { FidelityModule } from './fidelity.module';

async function bootstrap() {
  const app = await NestFactory.create(FidelityModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
