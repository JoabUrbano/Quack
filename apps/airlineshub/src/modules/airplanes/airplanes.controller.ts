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
import { CreateAirplaneDto } from '@airlineshub/modules/airplanes/dtos/createAirplane.dto';
import { CreateAirplaneUseCase } from '@airlineshub/modules/airplanes/usecases/createAirplane.usecase';
import { FindManyAirplanesDto } from '@airlineshub/modules/airplanes/dtos/findManyAirplanes.dto';
import { FindManyAirplanesUseCase } from '@airlineshub/modules/airplanes/usecases/findManyAirplanes.usecase';
import { FindOneAirplaneByIdUseCase } from '@airlineshub/modules/airplanes/usecases/findOneAirplaneById.usecase';
import { DeleteOneAirplaneUseCase } from '@airlineshub/modules/airplanes/usecases/deleteOneAirplane.usecase';
import { UpdateOneAirplaneUseCase } from '@airlineshub/modules/airplanes/usecases/updateOneAirplane.usecase';
import { UpdateOneAirplaneDto } from '@airlineshub/modules/airplanes/dtos/updateOneAirplane.dto';


@Controller('airplanes')
export class AirplanesController {
  constructor(
    private readonly createAirplaneUseCase: CreateAirplaneUseCase,
    private readonly findManyAirplanesUseCase: FindManyAirplanesUseCase,
    private readonly findOneAirplaneByIdUseCase: FindOneAirplaneByIdUseCase,
    private readonly deleteOneAirplaneUseCase: DeleteOneAirplaneUseCase,
    private readonly updateOneAirplaneUseCase: UpdateOneAirplaneUseCase,
  ) {}

  @Post()
  createAirplane(@Body() createAirplaneDto: CreateAirplaneDto) {
    return this.createAirplaneUseCase.execute(createAirplaneDto);
  }

  @Get()
  findAllAirplanes(@Query() findManyAirplanesDto: FindManyAirplanesDto) {
    return this.findManyAirplanesUseCase.execute(findManyAirplanesDto);
  }

  @Get(':id')
  findOneAirplaneById(@Param('id') id: string) {
    return this.findOneAirplaneByIdUseCase.execute(id);
  }

  @Delete(':id')
  deleteAirplane(@Param('id') id: string) {
    return this.deleteOneAirplaneUseCase.execute(id);
  }

  @Patch(':id')
  updateAirplane(
    @Param('id') id: string,
    @Body() updateOneAirplaneDto: UpdateOneAirplaneDto,
  ) {
    return this.updateOneAirplaneUseCase.execute(id, updateOneAirplaneDto);
  }
}
