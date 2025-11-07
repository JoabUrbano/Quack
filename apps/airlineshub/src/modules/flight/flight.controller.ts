import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { FindManyFlightsUseCase } from '@airlineshub/modules/flight/usecases/findManyFlights.usecase';
import { CreateFlightUseCase } from '@airlineshub/modules/flight/usecases/createFlight.usecase';

import { FindManyFlightsDto } from '@airlineshub/modules/flight/dtos/findManyFlights.dto';
import { CreateFlightDto } from '@airlineshub/modules/flight/dtos/createFlight.dto';
import { FindFlightByNumberUseCase } from '@airlineshub/modules/flight/usecases/getFlightByNumber.usecase';

import { FailStateRequest01 } from '@app/shared/states/failStateRequest01';

@ApiTags('Flights')
@Controller('flights')
export class FlightController {
  constructor(
    private readonly createFlightUseCase: CreateFlightUseCase,
    private readonly findManyFlightsUseCase: FindManyFlightsUseCase,
    private readonly findFlightByNumberUseCase: FindFlightByNumberUseCase,
    private failState: FailStateRequest01
  ) {}

  @ApiOperation({ summary: 'Create a new flight' })
  @ApiResponse({ status: 201, description: 'Flight created successfully' })
  @Post()
  createFlight(@Body() createFlightDto: CreateFlightDto) {
    return this.createFlightUseCase.execute(createFlightDto);
  }

  @ApiOperation({ summary: 'Get all flights' })
  @ApiResponse({ status: 200, description: 'List of flights returned' })
  @Get()
  findManyFlights(@Query() findManyFlightsDto: FindManyFlightsDto) {
    return this.findManyFlightsUseCase.execute({
      page: findManyFlightsDto.page,
      limit: findManyFlightsDto.limit,
    });
  }

  @ApiOperation({ summary: 'Get flight by number and day' })
  @ApiResponse({ status: 200, description: 'Flight found' })
  @ApiResponse({ status: 404, description: 'Flight not found' })
  @Get('flight')
  getFlight(@Query('flight') flight: number, @Query('day') day: Date) {
    this.failState.probability()

    if(this.failState.request01State == true) {
      let a = 5
    }
    else {
      return this.findFlightByNumberUseCase.execute({
      flight: +flight,
      day: day,
    });
    }
  }
}
