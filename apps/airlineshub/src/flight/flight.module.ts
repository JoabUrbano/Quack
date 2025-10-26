import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { FindManyFlightsUseCase } from '@airlineshub/usecases/findManyFlights.usecase';
import { FlightsRepository } from '@airlineshub/domains/repositories/tickets.repository';
import { PrismaFlightsRepository } from '@airlineshub/infra/repositories/tickets.repository';
import { PrismaService } from '@airlineshub/prisma.service';

@Module({
  imports: [],
  controllers: [FlightController],
  providers: [
    PrismaService,
    FlightService,
    FindManyFlightsUseCase,
    {
      provide: FlightsRepository,
      useClass: PrismaFlightsRepository,
    },
  ],
})
export class FlightModule {}
