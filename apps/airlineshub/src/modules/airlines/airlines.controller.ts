import { Body, Controller, Get, Param, Post, Query, Delete } from '@nestjs/common';
import { CreateAirlineDto } from '@airlineshub/modules/airlines/dtos/createAirline.dto';
import { CreateAirlineUseCase } from '@airlineshub/modules/airlines/usecases/creteAirline.usecase';
import { FindManyAirlinesDto } from '@airlineshub/modules/airlines/dtos/findManyAirlines.dto';
import { FindManydAirlinesUseCase } from '@airlineshub/modules/airlines/usecases/findManyAirlines.usecase';
import { FindOneAirlineUseCase } from '@airlineshub/modules/airlines/usecases/findOneAirline.usecase';
import { DeleteOneAirlineUseCase } from '@airlineshub/modules/airlines/usecases/deleteOneAirline.usecase';

@Controller('airlines')
export class AirlinesController {
  constructor(
    private readonly createAirlineUseCase: CreateAirlineUseCase,
    private readonly findManyAirlinesUseCase: FindManydAirlinesUseCase,
    private readonly findOneAirlineUseCase : FindOneAirlineUseCase,
    private readonly deleteOneAirlineUseCase : DeleteOneAirlineUseCase,
  ) {}

  @Post()
  createAirline(@Body() createAirlineDto: CreateAirlineDto) {
    return this.createAirlineUseCase.execute(createAirlineDto);
  }

  @Get()
  findAllAirlines(@Query() findManyAirlinesDto: FindManyAirlinesDto) {
    return this.findManyAirlinesUseCase.execute(findManyAirlinesDto);
  }
  @Get(':id')
  findOneAirline(@Param('id') id: string) {
    return this.findOneAirlineUseCase.execute(id);
  }
  @Delete(':id')
  deleteAirline(@Param('id') id: string) {
    return this.deleteOneAirlineUseCase.execute(id);
  }
}
