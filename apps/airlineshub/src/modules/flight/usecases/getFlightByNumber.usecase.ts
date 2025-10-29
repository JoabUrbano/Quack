import { Injectable, NotFoundException } from '@nestjs/common';
import { GetFlightDto } from '../dtos/getFlight.dto';
import { FlightsRepository } from '@airlineshub/domains/repositories/flights.repository';
import { AirplanesRepository } from '@airlineshub/domains/repositories/airplanes.repository';
import { AirportsRepository } from '@airlineshub/domains/repositories/airports.repository';
import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';

@Injectable()
export class FindFlightByNumberUseCase {
  constructor(
    private flightRepository: FlightsRepository,
    private airplaneRepository: AirplanesRepository,
    private airportRepository: AirportsRepository,
    private airlineRepository: AirlinesRepository,
  ) {}

  async execute(params: GetFlightDto) {
    const { flight: flightNumber, day } = params;

    const flight = await this.flightRepository.findByFlightNumber(flightNumber);

    if (!flight) {
      throw new NotFoundException('Flight not found');
    }

    const [airplane, airline, airports] = await Promise.all([
      this.airlineRepository.findOneById(flight.airlineId),
      this.airplaneRepository.findOneById(flight.airplaneId),
      this.airportRepository.findMany({
        ids: [flight.departureAirportId, flight.arrivalAirportId],
      }),
    ]);

    const departureAirport = airports.find(
      (airport) => airport.id === flight.departureAirportId,
    );

    const arrivalAirport = airports.find(
      (airport) => airport.id === flight.arrivalAirportId,
    );

    return {
      airplane: airplane.raw(),
      flightNumber: flight.flightNumber,
      expectedDeparture: flight.expectedDeparture,
      expectedArrival: flight.expectedArrival,
      duration: flight.duration,
      departureAirportId: departureAirport && departureAirport.raw(),
      arrivalAirportId: arrivalAirport && arrivalAirport.raw(),
      terminal: flight.terminal,
      gate: flight.gate,
      airline: airline.raw(),
      status: flight.status,
    };
  }
}
