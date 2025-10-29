import { AirplanesRepository } from '@airlineshub/domains/repositories/airplanes.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateOneAirplaneDto } from '@airlineshub/modules/airplanes/dtos/updateOneAirplane.dto';

@Injectable()
export class UpdateOneAirplaneUseCase {
  constructor(private readonly airplanesRepository: AirplanesRepository) {}

  async execute(id: string, inputAirplane: UpdateOneAirplaneDto) {
    const airplane = await this.airplanesRepository.findOneById(id);

    if (!airplane) {
      throw new NotFoundException('Airplane not found');
    }

    if (inputAirplane.model) {
      airplane.model = inputAirplane.model;
    }

    if (inputAirplane.capacity) {
      airplane.capacity = inputAirplane.capacity;
    }

    await this.airplanesRepository.save(airplane);

    return airplane.raw();
  }
}
