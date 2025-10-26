import { Body, Controller, Get, Query } from '@nestjs/common';
import { FlightService } from './flight.service';
import { GetFlightDto } from './dtos/getFlight.sto';
import { FindManyFlightsUseCase } from '@airlineshub/usecases/findManyFlights.usecase';

import { FindManyFlightsDto } from '@airlineshub/flight/dtos/findManyFlights.dto';

@Controller('flights')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly findManyFlightsUseCase: FindManyFlightsUseCase,
  ) {}

  @Get()
  findManyFlights(@Query() findManyFlightsDto: FindManyFlightsDto) {
    return this.findManyFlightsUseCase.execute({
      page: findManyFlightsDto.page,
      limit: findManyFlightsDto.limit,
    });
  }

  @Get(':id')
  getFlight(@Body() body: GetFlightDto): string {
    return this.flightService.getFlightDetails(body.flight, body.day);
  }
}
