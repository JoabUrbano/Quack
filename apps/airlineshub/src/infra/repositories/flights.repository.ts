import { FlightEntity } from '@airlineshub/domains/entities/flight.entity';
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
        airplaneId: flight.airplaneId,
        flightNumber: flight.flightNumber,
        duration: flight.duration,
        departureAirportId: flight.departureAirportId,
        arrivalAirportId: flight.arrivalAirportId,
        terminal: flight.terminal,
        gate: flight.gate,
        airlineId: flight.airlineId,
      },
      create: {
        id: flight.id,
        airplaneId: flight.airplaneId,
        flightNumber: flight.flightNumber,
        duration: flight.duration,
        departureAirportId: flight.departureAirportId,
        arrivalAirportId: flight.arrivalAirportId,
        terminal: flight.terminal,
        gate: flight.gate,
        airlineId: flight.airlineId,
      },
    });

    return new FlightEntity({
      id: savedFlight.id,
      airplaneId: savedFlight.airplaneId,
      flightNumber: savedFlight.flightNumber,
      duration: savedFlight.duration,
      departureAirportId: savedFlight.departureAirportId,
      arrivalAirportId: savedFlight.arrivalAirportId,
      terminal: savedFlight.terminal,
      gate: savedFlight.gate,
      airlineId: savedFlight.airlineId,
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
        airplaneId: true,
        flightNumber: true,
        duration: true,
        departureAirportId: true,
        arrivalAirportId: true,
        terminal: true,
        gate: true,
        airlineId: true,
      },
    });

    return flights.map(
      (flight) =>
        new FlightEntity({
          id: flight.id,
          airplaneId: flight.airplaneId,
          flightNumber: flight.flightNumber,
          duration: flight.duration,
          departureAirportId: flight.departureAirportId,
          arrivalAirportId: flight.arrivalAirportId,
          terminal: flight.terminal,
          gate: flight.gate,
          airlineId: flight.airlineId,
        }),
    );
  }

  async findByFlightNumber(number: number): Promise<FlightEntity | null> {
    const flight = await this.prismaService.flight.findUnique({
      where: { flightNumber: number },
      select: {
        id: true,
        airplaneId: true,
        flightNumber: true,
        duration: true,
        departureAirportId: true,
        arrivalAirportId: true,
        terminal: true,
        gate: true,
        airlineId: true,
      },
    });

    if (!flight) {
      return null;
    }

    return new FlightEntity({
      id: flight.id,
      airplaneId: flight.airplaneId,
      flightNumber: flight.flightNumber,
      duration: flight.duration,
      departureAirportId: flight.departureAirportId,
      arrivalAirportId: flight.arrivalAirportId,
      terminal: flight.terminal,
      gate: flight.gate,
      airlineId: flight.airlineId,
    });
  }
}
