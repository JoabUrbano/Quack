import { AirplanesRepository } from '@airlineshub/domains/repositories/airplanes.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteOneAirplaneUseCase {
  constructor(private readonly airplanesRepository: AirplanesRepository) {}

  async execute(id: string) {
    await this.airplanesRepository.delete(id);
    return `Airplane with #${id} was deleted`;
  }
}
