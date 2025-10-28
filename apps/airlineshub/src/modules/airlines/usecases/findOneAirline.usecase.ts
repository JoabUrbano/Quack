import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';
import { Injectable } from '@nestjs/common';
//import {FindOneAirlineUseCase } from '@airlineshub/modules/airlines/dtos/findManyAirlines.dto';

@Injectable()
export class FindOneAirlineUseCase {
  constructor(private readonly airlinesRepository: AirlinesRepository) {}

  async execute(id : string ) {
	const airline = await this.airlinesRepository.findById(id);
	return airline;
  }
}
