import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';
import { AirplanesRepository } from '@airlineshub/domains/repositories/airplanes.repository';
import { AirportsRepository } from '@airlineshub/domains/repositories/airports.repository';
import { FlightsRepository } from '@airlineshub/domains/repositories/flights.repository';
import { Injectable } from '@nestjs/common';
import { FlightDetailMapper } from '@airlineshub/modules/flight/usecases/mappers';
import {
  FlightDto,
  FindManyFlightsDto,
} from '@airlineshub/modules/flight/dtos';

@Injectable()
export class FindManyFlightsUseCase {
  constructor(
    private flightsRepository: FlightsRepository,
    private airplanesRepository: AirplanesRepository,
    private airportsRepository: AirportsRepository,
    private airlinesRepository: AirlinesRepository,
  ) {}

  async execute(input: FindManyFlightsDto): Promise<FlightDto[]> {
    const { limit, page } = input;

    const flights = await this.flightsRepository.findMany({ page, limit });

    const [airlines, airplanes, airports] = await Promise.all([
      this.airlinesRepository.findMany({
        ids: flights.map((flight) => flight.airlineId),
      }),
      this.airplanesRepository.findMany({
        ids: flights.map((flight) => flight.airplaneId),
      }),
      this.airportsRepository.findMany({
        ids: [
          ...flights.flatMap((flight) => [
            flight.departureAirportId,
            flight.arrivalAirportId,
          ]),
        ],
      }),
    ]);

    return flights.map((flight) => {
      const airplane = airplanes.find(
        (airplane) => airplane.id === flight.airplaneId,
      );

      const airline = airlines.find(
        (airline) => airline.id === flight.airlineId,
      );

      const departureAirport = airports.find(
        (airport) => airport.id === flight.departureAirportId,
      );

      const arrivalAirport = airports.find(
        (airport) => airport.id === flight.arrivalAirportId,
      );

      return FlightDetailMapper.toPresentationDTO({
        flight,
        airplane,
        departureAirport,
        arrivalAirport,
        airline,
      });
    });
  }
}
