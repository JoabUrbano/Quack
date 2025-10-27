import { Injectable } from "@nestjs/common";
import { GetFlightDto } from "../dtos/getFlight.dto";
import { FlightsRepository } from "@airlineshub/domains/repositories/flights.repository";

@Injectable()
export class FindFlightByNumberUseCase {
  constructor( private readonly flightRepository: FlightsRepository ) {}
  execute(params: GetFlightDto): any {
    const { flight, day } = params;
    const response = this.flightRepository.findByFlightNumber(flight)
    return response;
  }
}