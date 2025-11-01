import { FlightsRepository } from '@airlineshub/domains/repositories/flights.repository';
import { CreateFlightDto } from '@airlineshub/modules/flight/dtos/createFlight.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FlightEntity } from '@airlineshub/domains/entities/flight.entity';
import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';
import { AirplanesRepository } from '@airlineshub/domains/repositories/airplanes.repository';
import { AirportsRepository } from '@airlineshub/domains/repositories/airports.repository';

@Injectable()
export class CreateFlightUseCase {
  constructor(
    private readonly flightsRepository: FlightsRepository,
    private readonly airlinesRepository: AirlinesRepository,
    private readonly airplanesRepository: AirplanesRepository,
    private readonly airportsRepository: AirportsRepository,
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

    const departureAirport = await this.airportsRepository.findOneById(
      input.departureAirportId,
    );

    if (!departureAirport) {
      throw new NotFoundException('Departure airport not found');
    }

    const arrivalAirport = await this.airportsRepository.findOneById(
      input.arrivalAirportId,
    );

    if (!arrivalAirport) {
      throw new NotFoundException('Arrival airport not found');
    }

    const flight = FlightEntity.create({
      airplaneId: airplane.id,
      duration: input.duration,
      departureAirportId: input.departureAirportId,
      arrivalAirportId: input.arrivalAirportId,
      terminal: input.terminal,
      gate: input.gate,
      airlineId: input.airlineId,
    });

    const savedFlight = await this.flightsRepository.save(flight);

    return savedFlight.raw();
  }
}
