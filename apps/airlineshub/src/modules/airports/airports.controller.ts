import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateAirportDto } from '@airlineshub/modules/airports/dtos/createAirport.dto';
import { CreateAirportUseCase } from '@airlineshub/modules/airports/usecases/createAirport.usecase';
import { FindManyAirportsDto } from '@airlineshub/modules/airports/dtos/findManyAirports.dto';
import { FindManyAirportsUseCase } from '@airlineshub/modules/airports/usecases/findManyAirports.usecase';
import { FindOneAirportByIdUseCase } from '@airlineshub/modules/airports/usecases/findOneAirportById.usecase';
import { DeleteOneAirportUseCase } from '@airlineshub/modules/airports/usecases/deleteOneAirport.usecase';
import { UpdateOneAirportUseCase } from '@airlineshub/modules/airports/usecases/updateOneAirport.usecase';
import { UpdateOneAirportDto } from '@airlineshub/modules/airports/dtos/updateOneAirport.dto';

@Controller('airports')
export class AirportsController {
  constructor(
    private readonly createAirportUseCase: CreateAirportUseCase,
    private readonly findManyAirportsUseCase: FindManyAirportsUseCase,
    private readonly findOneAirportByIdUseCase: FindOneAirportByIdUseCase,
    private readonly deleteOneAirportUseCase: DeleteOneAirportUseCase,
    private readonly updateOneAirportUseCase: UpdateOneAirportUseCase,
  ) {}

  @Post()
  createAirport(@Body() createAirportDto: CreateAirportDto) {
    return this.createAirportUseCase.execute(createAirportDto);
  }

  @Get()
  findAllAirports(@Query() findManyAirportsDto: FindManyAirportsDto) {
    return this.findManyAirportsUseCase.execute(findManyAirportsDto);
  }

  @Get(':id')
  findOneAirport(@Param('id') id: string) {
    return this.findOneAirportByIdUseCase.execute(id);
  }

  @Delete(':id')
  deleteAirport(@Param('id') id: string) {
    return this.deleteOneAirportUseCase.execute(id);
  }

  @Patch(':id')
  updateAirport(
    @Param('id') id: string,
    @Body() updateOneAirportDto: UpdateOneAirportDto,
  ) {
    return this.updateOneAirportUseCase.execute(id, updateOneAirportDto);
  }
}
