import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

import * as Joi from 'joi';

import { AppController } from '@airlineshub/app.controller';
import { FlightModule } from '@airlineshub/modules/flight/flight.module';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';
import { AppService } from '@airlineshub/app.service';
import { AirlinesModule } from '@airlineshub/modules/airlines/airlines.module';
import { AirplanesModule } from '@airlineshub/modules/airplanes/airplanes.module';
import { AirportsModule } from '@airlineshub/modules/airports/airports.module';
import { AirTicketsModule } from '@airlineshub/modules/airtickets/airtickets.module';
import { UsersModule } from '@airlineshub/modules/users/users.module';
import { SharedModule } from '@app/shared/shared.module';
import { DomainExceptionFilter } from '@airlineshub/common/filters';
import { AirTicketsRepository } from '@airlineshub/domains/repositories/airTickets.repository';
import { PrismaAirTicketsRepository } from '@airlineshub/infra/repositories/prismaAirTickets.repository';
import { SellTicketUseCase } from '@airlineshub/usecases/sellTicket.usecase';
import { FlightsRepository } from '@airlineshub/domains/repositories/flights.repository';
import { PrismaFlightsRepository } from '@airlineshub/infra/repositories/flights.repository';
import { RabbitMQModule } from '@airlineshub/modules/rabbitmq/rabbitmq.module';
import { AuthGuard } from '@app/shared/guards';

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
    AirTicketsModule,
    UsersModule,
    SharedModule,
    RabbitMQModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    AppService,
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
    SellTicketUseCase,
    {
      provide: FlightsRepository,
      useClass: PrismaFlightsRepository,
    },
    {
      provide: AirTicketsRepository,
      useClass: PrismaAirTicketsRepository,
    },
  ],
})
export class AppModule {}
