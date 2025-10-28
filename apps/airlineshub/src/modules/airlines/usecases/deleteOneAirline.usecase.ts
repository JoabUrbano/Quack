import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteOneAirlineUseCase {
  constructor(private readonly airlinesRepository: AirlinesRepository) {}

  async execute(id : string ) {
	await this.airlinesRepository.delete(id);
	return `Airline with #${id} was deleted`;
  }
}
