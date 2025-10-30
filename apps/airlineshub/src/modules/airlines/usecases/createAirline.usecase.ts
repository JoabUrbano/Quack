import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';

import { CreateAirlineDto } from '@airlineshub/modules/airlines/dtos/createAirline.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { AirlineEntity } from '@airlineshub/domains/entities/airline.entity';

@Injectable()
export class CreateAirlineUseCase {
  constructor(private readonly airlinesRepository: AirlinesRepository) {}

  async execute(input: CreateAirlineDto) {
    const existingAirline = await this.airlinesRepository.findOneByName(
      input.name,
    );

    if (existingAirline) {
      throw new ConflictException('Airline with this name already exists');
    }

    const airline = AirlineEntity.create({
      name: input.name,
      country: input.country,
    });

    await this.airlinesRepository.save(airline);

    return airline.raw();
  }
}
