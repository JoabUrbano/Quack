import { FlightsRepository } from '@airlineshub/domains/repositories/tickets.repository';
import { FindManyFlightsDto } from '@airlineshub/modules/flight/dtos/findManyFlights.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindManyFlightsUseCase {
  constructor(private readonly flightsRepository: FlightsRepository) {}

  async execute(input: FindManyFlightsDto) {
    const { limit, page } = input;

    const flights = await this.flightsRepository.findMany({ page, limit });

    return flights.map((flight) => flight.raw());
  }
}
