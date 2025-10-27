import {
  FlightEntity,
  FlightStatus,
} from '@airlineshub/domains/entities/flight.entity';
import {
  FlightsRepository,
  IFindManyFilter,
} from '@airlineshub/domains/repositories/flights.repository';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';

@Injectable()
export class PrismaFlightsRepository implements FlightsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(flight: FlightEntity): Promise<FlightEntity> {
    const savedFlight = await this.prismaService.flight.upsert({
      where: { id: flight.id },
      update: {
        flightNumber: flight.flightNumber,
        expectedDeparture: flight.expectedDeparture,
        expectedArrival: flight.expectedArrival,
        duration: flight.duration,
        terminal: flight.terminal,
        gate: flight.gate,
        airlineId: flight.airlineId,
        status: flight.status.value as any,
      },
      create: {
        id: flight.id,
        flightNumber: flight.flightNumber,
        expectedDeparture: flight.expectedDeparture,
        expectedArrival: flight.expectedArrival,
        duration: flight.duration,
        terminal: flight.terminal,
        gate: flight.gate,
        airlineId: flight.airlineId,
        status: flight.status.value as any,
      },
    });

    return new FlightEntity({
      id: savedFlight.id,
      flightNumber: savedFlight.flightNumber,
      expectedDeparture: savedFlight.expectedDeparture,
      expectedArrival: savedFlight.expectedArrival,
      duration: savedFlight.duration,
      terminal: savedFlight.terminal,
      gate: savedFlight.gate,
      airlineId: savedFlight.airlineId,
      status: FlightStatus.fromValue(savedFlight.status),
    });
  }

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

  async findByFlightNumber(number: number): Promise<FlightEntity | null> {
    const flight = await this.prismaService.flight.findUnique({
      where: { flightNumber: number},
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

    if (!flight) {
      return null
    }

    return new FlightEntity({
      id: flight.id,
      flightNumber: flight.flightNumber,
      expectedDeparture: flight.expectedDeparture,
      expectedArrival: flight.expectedArrival,
      duration: flight.duration,
      terminal: flight.terminal,
      gate: flight.gate,
      airlineId: flight.airlineId,
      status: FlightStatus.fromValue(flight.status),
    });
  }
}
