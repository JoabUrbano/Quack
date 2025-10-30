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
import { CreateAirplaneDto } from '@airlineshub/modules/airplanes/dtos/createAirplane.dto';
import { CreateAirplaneUseCase } from '@airlineshub/modules/airplanes/usecases/createAirplane.usecase';
import { FindManyAirplanesDto } from '@airlineshub/modules/airplanes/dtos/findManyAirplanes.dto';
import { FindManyAirplanesUseCase } from '@airlineshub/modules/airplanes/usecases/findManyAirplanes.usecase';
import { FindOneAirplaneByIdUseCase } from '@airlineshub/modules/airplanes/usecases/findOneAirplaneById.usecase';
import { DeleteOneAirplaneUseCase } from '@airlineshub/modules/airplanes/usecases/deleteOneAirplane.usecase';
import { UpdateOneAirplaneUseCase } from '@airlineshub/modules/airplanes/usecases/updateOneAirplane.usecase';
import { UpdateOneAirplaneDto } from '@airlineshub/modules/airplanes/dtos/updateOneAirplane.dto';

@ApiTags('Airplanes')
@Controller('airplanes')
export class AirplanesController {
  constructor(
    private readonly createAirplaneUseCase: CreateAirplaneUseCase,
    private readonly findManyAirplanesUseCase: FindManyAirplanesUseCase,
    private readonly findOneAirplaneByIdUseCase: FindOneAirplaneByIdUseCase,
    private readonly deleteOneAirplaneUseCase: DeleteOneAirplaneUseCase,
    private readonly updateOneAirplaneUseCase: UpdateOneAirplaneUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new airplane' })
  @ApiResponse({ status: 201, description: 'Airplane created successfully' })
  @Post()
  createAirplane(@Body() createAirplaneDto: CreateAirplaneDto) {
    return this.createAirplaneUseCase.execute(createAirplaneDto);
  }

  @ApiOperation({ summary: 'Get all airplanes' })
  @ApiResponse({ status: 200, description: 'List of airplanes returned' })
  @Get()
  findAllAirplanes(@Query() findManyAirplanesDto: FindManyAirplanesDto) {
    return this.findManyAirplanesUseCase.execute(findManyAirplanesDto);
  }

  @ApiOperation({ summary: 'Get airplane by ID' })
  @ApiResponse({ status: 200, description: 'Airplane found' })
  @ApiResponse({ status: 404, description: 'Airplane not found' })
  @Get(':id')
  findOneAirplaneById(@Param('id') id: string) {
    return this.findOneAirplaneByIdUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Delete airplane by ID' })
  @ApiResponse({ status: 200, description: 'Airplane deleted successfully' })
  @ApiResponse({ status: 404, description: 'Airplane not found' })
  @Delete(':id')
  deleteAirplane(@Param('id') id: string) {
    return this.deleteOneAirplaneUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Update airplane by ID' })
  @ApiResponse({ status: 200, description: 'Airplane updated successfully' })
  @ApiResponse({ status: 404, description: 'Airplane not found' })
  @Patch(':id')
  updateAirplane(
    @Param('id') id: string,
    @Body() updateOneAirplaneDto: UpdateOneAirplaneDto,
  ) {
    return this.updateOneAirplaneUseCase.execute(id, updateOneAirplaneDto);
  }
}
