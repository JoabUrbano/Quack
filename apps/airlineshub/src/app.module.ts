import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@airlineshub/app.controller';
import { AppService } from '@airlineshub/app.service';
import { FlightModule } from './flight/flight.module';
import { PrismaService } from '@airlineshub/prisma.service';

import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AIRLINESHUB_DATABASE_URL: Joi.string().uri().required(),
      }),
    }),
    FlightModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
