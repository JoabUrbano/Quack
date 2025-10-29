import { AirplanesRepository } from '@airlineshub/domains/repositories/airplanes.repository';
import { Injectable } from '@nestjs/common';
import { FindManyAirplanesDto } from '@airlineshub/modules/airplanes/dtos/findManyAirplanes.dto';

@Injectable()
export class FindManyAirplanesUseCase {
  constructor(private readonly airplanesRepository: AirplanesRepository) {}

  async execute(input: FindManyAirplanesDto) {
    const { limit, page } = input;

    const airplanes = await this.airplanesRepository.findMany({ page, limit });

    return airplanes.map((airplane) => airplane.raw());
  }
}
