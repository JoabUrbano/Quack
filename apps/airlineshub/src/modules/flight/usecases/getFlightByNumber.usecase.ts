import { Injectable, NotFoundException } from '@nestjs/common';
import { GetFlightDto } from '@airlineshub/modules/flight/dtos';
import { FlightsRepository } from '@airlineshub/domains/repositories/flights.repository';
import { AirplanesRepository } from '@airlineshub/domains/repositories/airplanes.repository';
import { AirportsRepository } from '@airlineshub/domains/repositories/airports.repository';
import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';
import { FlightDetailMapper } from '@airlineshub/modules/flight/usecases/mappers';
import { FlightDto } from '@app/shared/types/fligt.dto';
import { FlightSchedulesRepository } from '@airlineshub/domains/repositories/flightSchedules.repository';

@Injectable()
export class FindFlightByNumberUseCase {
  constructor(
    private flightRepository: FlightsRepository,
    private airplanesRepository: AirplanesRepository,
    private airportsRepository: AirportsRepository,
    private airlinesRepository: AirlinesRepository,
    private flightSchedulesRepository: FlightSchedulesRepository,
  ) {}

  async execute(params: GetFlightDto): Promise<FlightDto> {
    const { flight: flightNumber, day } = params;

    const flight = await this.flightRepository.findByFlightNumber(flightNumber);

    if (!flight) {
      throw new NotFoundException('Flight not found');
    }

    const [airline, airplane, airports] = await Promise.all([
      this.airlinesRepository.findOneById(flight.airlineId),
      this.airplanesRepository.findOneById(flight.airplaneId),
      this.airportsRepository.findMany({
        ids: [flight.departureAirportId, flight.arrivalAirportId],
      }),
    ]);

    const departureAirport = airports.find(
      (airport) => airport.id === flight.departureAirportId,
    );

    const arrivalAirport = airports.find(
      (airport) => airport.id === flight.arrivalAirportId,
    );

    const flightSchedules = await this.flightSchedulesRepository.findByFlightId(
      flight.id,
    );

    return FlightDetailMapper.toPresentationDTO({
      flight,
      airplane,
      departureAirport,
      arrivalAirport,
      airline,
      flightSchedules,
    });
  }
}
