import { AirportsRepository } from '@airlineshub/domains/repositories/airports.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteOneAirportUseCase {
  constructor(private readonly airportsRepository: AirportsRepository) {}

  async execute(id: string) {
    await this.airportsRepository.delete(id);
    return `Airport with #${id} was deleted`;
  }
}
