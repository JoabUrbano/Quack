import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FindManyFlightsUseCase } from '@airlineshub/modules/flight/usecases/findManyFlights.usecase';
import { CreateFlightUseCase } from '@airlineshub/modules/flight/usecases/createFlight.usecase';

import { FindManyFlightsDto } from '@airlineshub/modules/flight/dtos/findManyFlights.dto';
import { CreateFlightDto } from '@airlineshub/modules/flight/dtos/createFlight.dto';
import { FindFlightByNumberUseCase } from './usecases/getFlightByNumber.usecase';

@Controller('flights')
export class FlightController {
  constructor(
    private readonly createFlightUseCase: CreateFlightUseCase,
    private readonly findManyFlightsUseCase: FindManyFlightsUseCase,
    private readonly findFlightByNumberUseCase: FindFlightByNumberUseCase,
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

  @Get(':flight')
  getFlight(@Param('flight') flight: number, @Query('day') day: Date): any {
    return this.findFlightByNumberUseCase.execute({ flight: flight, day } );
  }
}
