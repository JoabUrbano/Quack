import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import * as Joi from 'joi';

import { AppController } from '@airlineshub/app.controller';
import { FlightModule } from '@airlineshub/modules/flight/flight.module';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';
import { AppService } from '@airlineshub/app.service';
import { AirlinesModule } from '@airlineshub/modules/airlines/airlines.module';
import { AirplanesModule } from '@airlineshub/modules/airplanes/airplanes.module';
import { AirportsModule } from '@airlineshub/modules/airports/airports.module';
import { SharedModule } from '@app/shared/shared.module';
import { DomainExceptionFilter } from '@airlineshub/common/filters';

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
    AirplanesModule,
    AirportsModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
  ],
})
export class AppModule {}
