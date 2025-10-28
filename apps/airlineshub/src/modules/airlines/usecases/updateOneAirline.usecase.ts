import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';
import { Injectable } from '@nestjs/common';
import { UpdateOneAirlineDto } from '../dtos/updateOneAirline.dto';
import { AirlineEntity } from '@airlineshub/domains/entities/airline.entity';



@Injectable()
export class UpdateOneAirlineUseCase {
  constructor(private readonly airlinesRepository: AirlinesRepository) {}

  async execute(id : string, data: UpdateOneAirlineDto ) : Promise<AirlineEntity>{
	return this.airlinesRepository.update(id, data);
  }
}
