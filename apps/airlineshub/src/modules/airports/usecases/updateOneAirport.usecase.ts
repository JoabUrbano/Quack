import { AirportsRepository } from '@airlineshub/domains/repositories/airports.repository';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateOneAirportDto } from '@airlineshub/modules/airports/dtos/updateOneAirport.dto';

@Injectable()
export class UpdateOneAirportUseCase {
  constructor(private readonly airportsRepository: AirportsRepository) {}

  async execute(id: string, data: UpdateOneAirportDto) {
    const airport = await this.airportsRepository.findOneById(id);

    if (!airport) {
      throw new NotFoundException('Airport not found');
    }

    airport.name = data.name ?? airport.name;
    airport.city = data.city ?? airport.city;
    airport.country = data.country ?? airport.country;

    if (data.iata && data.iata !== airport.iata) {
      const existingAirport = await this.airportsRepository.findOneByIata(
        data.iata,
      );

      if (existingAirport && !existingAirport.equals(airport)) {
        throw new ConflictException(
          'Airport with this IATA code already exists',
        );
      }

      airport.iata = data.iata;
    }

    await this.airportsRepository.save(airport);

    return airport.raw();
  }
}
