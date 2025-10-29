import { Injectable } from "@nestjs/common";
import { GetFlightDto } from "../dtos/getFlight.dto";
import { FlightsRepository } from "@airlineshub/domains/repositories/flights.repository";

@Injectable()
export class FindFlightByNumberUseCase {
  constructor( private readonly flightRepository: FlightsRepository ) {}
  
  async execute(params: GetFlightDto) {
    const { flight, day } = params;
    const flightReturn = await this.flightRepository.findByFlightNumber(flight)
    return flightReturn.raw();
  }
}