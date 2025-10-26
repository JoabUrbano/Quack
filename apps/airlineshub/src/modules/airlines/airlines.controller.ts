import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateAirlineDto } from '@airlineshub/modules/airlines/dtos/createAirline.dto';
import { CreateAirlineUseCase } from '@airlineshub/modules/airlines/usecases/creteAirline.usecase';
import { FindManyAirlinesDto } from '@airlineshub/modules/airlines/dtos/findManyAirlines.dto';
import { FindManydAirlinesUseCase } from '@airlineshub/modules/flight/usecases/findManyAirlines.usecase';

@Controller('airlines')
export class AirlinesController {
  constructor(
    private readonly createAirlineUseCase: CreateAirlineUseCase,
    private readonly findManyAirlinesUseCase: FindManydAirlinesUseCase,
  ) {}

  @Post()
  createAirline(@Body() createAirlineDto: CreateAirlineDto) {
    return this.createAirlineUseCase.execute(createAirlineDto);
  }

  @Get()
  findAllAirlines(@Query() findManyAirlinesDto: FindManyAirlinesDto) {
    return this.findManyAirlinesUseCase.execute(findManyAirlinesDto);
  }
}
