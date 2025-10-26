import {
  FlightEntity,
  FlightStatus,
} from '@airlineshub/domains/entities/flight.entity';
import {
  FlightsRepository,
  IFindManyFilter,
} from '@airlineshub/domains/repositories/tickets.repository';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaFlightsRepository implements FlightsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(input: IFindManyFilter): Promise<FlightEntity[]> {
    const { page, limit } = input;

    let pagination = {};

    if (page && limit) {
      pagination = {
        skip: (page - 1) * limit,
        take: limit,
      };
    }

    const flights = await this.prismaService.flight.findMany({
      ...pagination,
      select: {
        id: true,
        flightNumber: true,
        expectedDeparture: true,
        expectedArrival: true,
        duration: true,
        terminal: true,
        gate: true,
        airlineId: true,
        status: true,
      },
    });

    return flights.map(
      (flight) =>
        new FlightEntity({
          id: flight.id,
          flightNumber: flight.flightNumber,
          expectedDeparture: flight.expectedDeparture,
          expectedArrival: flight.expectedArrival,
          duration: flight.duration,
          terminal: flight.terminal,
          gate: flight.gate,
          airlineId: flight.airlineId,
          status: FlightStatus.fromValue(flight.status),
        }),
    );
  }
}
