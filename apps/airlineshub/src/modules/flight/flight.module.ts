import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { FindManyFlightsUseCase } from '@airlineshub/modules/flight/usecases/findManyFlights.usecase';
import { CreateFlightUseCase } from '@airlineshub/modules/flight/usecases/createFlight.usecase';
import { FlightsRepository } from '@airlineshub/domains/repositories/flights.repository';
import { PrismaFlightsRepository } from '@airlineshub/infra/repositories/flights.repository';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';
import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';
import { PrismaAirlinesRepository } from '@airlineshub/infra/repositories/airlines.repository';

@Module({
  imports: [],
  controllers: [FlightController],
  providers: [
    PrismaService,
    FlightService,
    CreateFlightUseCase,
    FindManyFlightsUseCase,
    {
      provide: FlightsRepository,
      useClass: PrismaFlightsRepository,
    },
    {
      provide: AirlinesRepository,
      useClass: PrismaAirlinesRepository,
    },
  ],
})
export class FlightModule {}
