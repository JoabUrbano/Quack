import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';
import { Injectable } from '@nestjs/common';
import { FindManyAirlinesDto } from '@airlineshub/airlines/dtos/findManyAirlines.dto';

@Injectable()
export class FindManydAirlinesUseCase {
  constructor(private readonly airlinesRepository: AirlinesRepository) {}

  async execute(input: FindManyAirlinesDto) {
    const { limit, page } = input;

    const airlines = await this.airlinesRepository.findMany({ page, limit });

    return airlines.map((airline) => airline.raw());
  }
}
