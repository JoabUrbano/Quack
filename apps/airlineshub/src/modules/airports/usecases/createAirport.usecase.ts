import { AirportsRepository } from '@airlineshub/domains/repositories/airports.repository';
import { CreateAirportDto } from '@airlineshub/modules/airports/dtos/createAirport.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { AirportEntity } from '@airlineshub/domains/entities/airport.entity';

@Injectable()
export class CreateAirportUseCase {
  constructor(private readonly airportsRepository: AirportsRepository) {}

  async execute(input: CreateAirportDto) {
    const airport = AirportEntity.create({
      name: input.name,
      city: input.city,
      country: input.country,
      iata: input.iata,
    });

    const existingAirport = await this.airportsRepository.findOneByIata(
      input.iata,
    );

    if (existingAirport) {
      throw new ConflictException('Airport with this IATA code already exists');
    }

    await this.airportsRepository.save(airport);

    return airport.raw();
  }
}
