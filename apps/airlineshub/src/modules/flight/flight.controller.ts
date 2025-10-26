import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FlightService } from './flight.service';
import { GetFlightDto } from './dtos/getFlight.sto';
import { FindManyFlightsUseCase } from '@airlineshub/modules/flight/usecases/findManyFlights.usecase';
import { CreateFlightUseCase } from '@airlineshub/modules/flight/usecases/createFlight.usecase';

import { FindManyFlightsDto } from '@airlineshub/modules/flight/dtos/findManyFlights.dto';
import { CreateFlightDto } from '@airlineshub/modules/flight/dtos/createFlight.dto';

@Controller('flights')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly createFlightUseCase: CreateFlightUseCase,
    private readonly findManyFlightsUseCase: FindManyFlightsUseCase,
  ) {}

  @Post()
  createFlight(@Body() createFlightDto: CreateFlightDto) {
    return this.createFlightUseCase.execute(createFlightDto);
  }

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
