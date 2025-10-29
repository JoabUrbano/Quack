import { FlightsRepository } from '@airlineshub/domains/repositories/flights.repository';
import { CreateFlightDto } from '@airlineshub/modules/flight/dtos/createFlight.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  FlightEntity,
  FlightStatus,
} from '@airlineshub/domains/entities/flight.entity';
import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';
import { AirplanesRepository } from '@airlineshub/domains/repositories/airplanes.repository';

@Injectable()
export class CreateFlightUseCase {
  constructor(
    private readonly flightsRepository: FlightsRepository,
    private readonly airlinesRepository: AirlinesRepository,
    private readonly airplanesRepository: AirplanesRepository,
  ) {}

  async execute(input: CreateFlightDto) {
    const airline = await this.airlinesRepository.findOneById(input.airlineId);

    if (!airline) {
      throw new NotFoundException('Airline not found');
    }

    const airplane = await this.airplanesRepository.findOneById(
      input.airplaneId,
    );

    if (!airplane) {
      throw new NotFoundException('Airplane not found');
    }

    const flight = FlightEntity.create({
      airplaneId: airplane.id,
      expectedDeparture: input.expectedDeparture,
      expectedArrival: input.expectedArrival,
      duration: input.duration,
      terminal: input.terminal,
      gate: input.gate,
      airlineId: input.airlineId,
      status: input.status
        ? FlightStatus.fromValue(input.status)
        : FlightStatus.SCHEDULED,
    });

    const savedFlight = await this.flightsRepository.save(flight);

    return savedFlight.raw();
  }
}
