import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

import { AppController } from '@airlineshub/app.controller';
import { FlightModule } from '@airlineshub/modules/flight/flight.module';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';
import { AppService } from '@airlineshub/app.service';
import { AirlinesModule } from '@airlineshub/modules/airlines/airlines.module';
import { SharedModule } from '@app/shared/shared.module';

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
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
