import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

import { AppController } from '@airlineshub/app.controller';
import { FlightModule } from '@airlineshub/flight/flight.module';
import { PrismaService } from '@airlineshub/prisma.service';
import { AppService } from '@airlineshub/app.service';
import { AirlinesModule } from '@airlineshub/airlines/airlines.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AIRLINESHUB_DATABASE_URL: Joi.string().uri().required(),
      }),
    }),
    FlightModule,
    AirlinesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
