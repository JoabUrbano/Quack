import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@airlineshub/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT', 3001);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('AirlinesHub API')
    .setDescription('AirlinesHub microservice API documentation')
    .setVersion('1.0.0')
    .addTag('Airlines', 'Airlines management')
    .addTag('Airplanes', 'Airplanes management')
    .addTag('Airports', 'Airports management')
    .addTag('Flights', 'Flights management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(port);
}

bootstrap();
