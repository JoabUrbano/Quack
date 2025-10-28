import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateOneAirlineDto } from '../dtos/updateOneAirline.dto';
import { AirlineEntity } from '@airlineshub/domains/entities/airline.entity';

@Injectable()
export class UpdateOneAirlineUseCase {
  constructor(private readonly airlinesRepository: AirlinesRepository) {}

  async execute(id: string,  inputAirline : UpdateOneAirlineDto ) {
	const airline = await this.airlinesRepository.findById(id);
	
	if(!airline){
	  	throw new NotFoundException('Airline not found');
	}
	
	
	airline.name = inputAirline.name;
	airline.country = inputAirline.country;
	
	await this.airlinesRepository.save(airline);
  	
	return airline.raw();
  }
}
