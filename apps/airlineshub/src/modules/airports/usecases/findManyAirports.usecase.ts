import { AirportsRepository } from '@airlineshub/domains/repositories/airports.repository';
import { Injectable } from '@nestjs/common';
import { FindManyAirportsDto } from '@airlineshub/modules/airports/dtos/findManyAirports.dto';

@Injectable()
export class FindManyAirportsUseCase {
  constructor(private readonly airportsRepository: AirportsRepository) {}

  async execute(input: FindManyAirportsDto) {
    const { limit, page } = input;

    const airports = await this.airportsRepository.findMany({ page, limit });

    return airports.map((airport) => airport.raw());
  }
}
