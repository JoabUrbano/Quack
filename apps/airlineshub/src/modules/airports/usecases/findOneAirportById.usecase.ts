import { AirportsRepository } from '@airlineshub/domains/repositories/airports.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindOneAirportByIdUseCase {
  constructor(private readonly airportsRepository: AirportsRepository) {}

  async execute(id: string) {
    const airport = await this.airportsRepository.findOneById(id);

    if (!airport) {
      throw new NotFoundException('Airport not found');
    }

    return airport.raw();
  }
}
