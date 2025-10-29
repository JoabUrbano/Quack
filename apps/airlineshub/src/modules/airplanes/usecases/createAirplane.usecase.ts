import { AirplanesRepository } from '@airlineshub/domains/repositories/airplanes.repository';
import { CreateAirplaneDto } from '@airlineshub/modules/airplanes/dtos/createAirplane.dto';
import { Injectable } from '@nestjs/common';
import { AirplaneEntity } from '@airlineshub/domains/entities/airplane.entity';

@Injectable()
export class CreateAirplaneUseCase {
  constructor(private readonly airplanesRepository: AirplanesRepository) {}

  async execute(input: CreateAirplaneDto) {
    const airplane = AirplaneEntity.create({
      model: input.model,
      capacity: input.capacity,
    });

    await this.airplanesRepository.save(airplane);

    return airplane.raw();
  }
}
