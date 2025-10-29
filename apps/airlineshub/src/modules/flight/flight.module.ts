import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FindManyFlightsUseCase } from '@airlineshub/modules/flight/usecases/findManyFlights.usecase';
import { CreateFlightUseCase } from '@airlineshub/modules/flight/usecases/createFlight.usecase';
import { FlightsRepository } from '@airlineshub/domains/repositories/flights.repository';
import { PrismaFlightsRepository } from '@airlineshub/infra/repositories/flights.repository';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';
import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';
import { PrismaAirlinesRepository } from '@airlineshub/infra/repositories/airlines.repository';
import { FindFlightByNumberUseCase } from './usecases/getFlightByNumber.usecase';
import { AirplanesRepository } from '@airlineshub/domains/repositories/airplanes.repository';
import { PrismaAirplanesRepository } from '@airlineshub/infra/repositories/airplanes.repository';

@Module({
  imports: [],
  controllers: [FlightController],
  providers: [
    PrismaService,
    CreateFlightUseCase,
    FindManyFlightsUseCase,
    FindFlightByNumberUseCase,
    {
      provide: FlightsRepository,
      useClass: PrismaFlightsRepository,
    },
    {
      provide: AirlinesRepository,
      useClass: PrismaAirlinesRepository,
    },
    {
      provide: AirplanesRepository,
      useClass: PrismaAirplanesRepository,
    },
  ],
})
export class FlightModule {}
