import { AirplanesRepository } from '@airlineshub/domains/repositories/airplanes.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindOneAirplaneByIdUseCase {
  constructor(private readonly airplanesRepository: AirplanesRepository) {}

  async execute(id: string) {
    const airplane = await this.airplanesRepository.findOneById(id);

    if (!airplane) {
      throw new NotFoundException('Airplane not found');
    }

    return airplane.raw();
  }
}
