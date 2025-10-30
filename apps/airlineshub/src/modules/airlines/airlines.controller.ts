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
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CreateAirlineDto } from '@airlineshub/modules/airlines/dtos/createAirline.dto';
import { CreateAirlineUseCase } from '@airlineshub/modules/airlines/usecases/createAirline.usecase';
import { FindManyAirlinesDto } from '@airlineshub/modules/airlines/dtos/findManyAirlines.dto';
import { FindManydAirlinesUseCase } from '@airlineshub/modules/airlines/usecases/findManyAirlines.usecase';
import { FindOneAirlineByIdUseCase } from '@airlineshub/modules/airlines/usecases/findOneAirlineById.usecase';
import { DeleteOneAirlineUseCase } from '@airlineshub/modules/airlines/usecases/deleteOneAirline.usecase';
import { UpdateOneAirlineUseCase } from '@airlineshub/modules/airlines/usecases/updateOneAirline.usecase';
import { UpdateOneAirlineDto } from '@airlineshub/modules/airlines/dtos/updateOneAirline.dto';

@ApiTags('Airlines')
@Controller('airlines')
export class AirlinesController {
  constructor(
    private readonly createAirlineUseCase: CreateAirlineUseCase,
    private readonly findManyAirlinesUseCase: FindManydAirlinesUseCase,
    private readonly FindOneAirlineByIdUseCase: FindOneAirlineByIdUseCase,
    private readonly deleteOneAirlineUseCase: DeleteOneAirlineUseCase,
    private readonly updateOneAirlineUseCase: UpdateOneAirlineUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new airline' })
  @ApiResponse({ status: 201, description: 'Airline created successfully' })
  @Post()
  createAirline(@Body() createAirlineDto: CreateAirlineDto) {
    return this.createAirlineUseCase.execute(createAirlineDto);
  }

  @ApiOperation({ summary: 'Get all airlines' })
  @ApiResponse({ status: 200, description: 'List of airlines returned' })
  @Get()
  findAllAirlines(@Query() findManyAirlinesDto: FindManyAirlinesDto) {
    return this.findManyAirlinesUseCase.execute(findManyAirlinesDto);
  }
  
  @ApiOperation({ summary: 'Get airline by ID' })
  @ApiResponse({ status: 200, description: 'Airline found' })
  @ApiResponse({ status: 404, description: 'Airline not found' })
  @Get(':id')
  findOneAirline(@Param('id') id: string) {
    return this.FindOneAirlineByIdUseCase.execute(id);
  }
  
  @ApiOperation({ summary: 'Delete airline by ID' })
  @ApiResponse({ status: 200, description: 'Airline deleted successfully' })
  @ApiResponse({ status: 404, description: 'Airline not found' })
  @Delete(':id')
  deleteAirline(@Param('id') id: string) {
    return this.deleteOneAirlineUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Update airline by ID' })
  @ApiResponse({ status: 200, description: 'Airline updated successfully' })
  @ApiResponse({ status: 404, description: 'Airline not found' })
  @Patch(':id')
  updateAirline(
    @Param('id') id: string,
    @Body() updateOneAirlineDto: UpdateOneAirlineDto,
  ) {
    return this.updateOneAirlineUseCase.execute(id, updateOneAirlineDto);
  }
}
