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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAirportDto } from '@airlineshub/modules/airports/dtos/createAirport.dto';
import { CreateAirportUseCase } from '@airlineshub/modules/airports/usecases/createAirport.usecase';
import { FindManyAirportsDto } from '@airlineshub/modules/airports/dtos/findManyAirports.dto';
import { FindManyAirportsUseCase } from '@airlineshub/modules/airports/usecases/findManyAirports.usecase';
import { FindOneAirportByIdUseCase } from '@airlineshub/modules/airports/usecases/findOneAirportById.usecase';
import { DeleteOneAirportUseCase } from '@airlineshub/modules/airports/usecases/deleteOneAirport.usecase';
import { UpdateOneAirportUseCase } from '@airlineshub/modules/airports/usecases/updateOneAirport.usecase';
import { UpdateOneAirportDto } from '@airlineshub/modules/airports/dtos/updateOneAirport.dto';

@ApiTags('Airports')
@Controller('airports')
export class AirportsController {
  constructor(
    private readonly createAirportUseCase: CreateAirportUseCase,
    private readonly findManyAirportsUseCase: FindManyAirportsUseCase,
    private readonly findOneAirportByIdUseCase: FindOneAirportByIdUseCase,
    private readonly deleteOneAirportUseCase: DeleteOneAirportUseCase,
    private readonly updateOneAirportUseCase: UpdateOneAirportUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new airport' })
  @ApiResponse({ status: 201, description: 'Airport created successfully' })
  @Post()
  createAirport(@Body() createAirportDto: CreateAirportDto) {
    return this.createAirportUseCase.execute(createAirportDto);
  }

  @ApiOperation({ summary: 'Get all airports' })
  @ApiResponse({ status: 200, description: 'List of airports returned' })
  @Get()
  findAllAirports(@Query() findManyAirportsDto: FindManyAirportsDto) {
    return this.findManyAirportsUseCase.execute(findManyAirportsDto);
  }

  @ApiOperation({ summary: 'Get airport by ID' })
  @ApiResponse({ status: 200, description: 'Airport found' })
  @ApiResponse({ status: 404, description: 'Airport not found' })
  @Get(':id')
  findOneAirport(@Param('id') id: string) {
    return this.findOneAirportByIdUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Delete airport by ID' })
  @ApiResponse({ status: 200, description: 'Airport deleted successfully' })
  @ApiResponse({ status: 404, description: 'Airport not found' })
  @Delete(':id')
  deleteAirport(@Param('id') id: string) {
    return this.deleteOneAirportUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Update airport by ID' })
  @ApiResponse({ status: 200, description: 'Airport updated successfully' })
  @ApiResponse({ status: 404, description: 'Airport not found' })
  @Patch(':id')
  updateAirport(
    @Param('id') id: string,
    @Body() updateOneAirportDto: UpdateOneAirportDto,
  ) {
    return this.updateOneAirportUseCase.execute(id, updateOneAirportDto);
  }
}
