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
import { CreateAirlineDto } from '@airlineshub/modules/airlines/dtos/createAirline.dto';
import { CreateAirlineUseCase } from '@airlineshub/modules/airlines/usecases/creteAirline.usecase';
import { FindManyAirlinesDto } from '@airlineshub/modules/airlines/dtos/findManyAirlines.dto';
import { FindManydAirlinesUseCase } from '@airlineshub/modules/airlines/usecases/findManyAirlines.usecase';
import { FindOneAirlineUseCase } from '@airlineshub/modules/airlines/usecases/findOneAirline.usecase';
import { DeleteOneAirlineUseCase } from '@airlineshub/modules/airlines/usecases/deleteOneAirline.usecase';
import { UpdateOneAirlineUseCase } from '@airlineshub/modules/airlines/usecases/updateOneAirline.usecase';
import { UpdateOneAirlineDto } from '@airlineshub/modules/airlines/dtos/updateOneAirline.dto';


@Controller('airlines')
export class AirlinesController {
  constructor(
    private readonly createAirlineUseCase: CreateAirlineUseCase,
    private readonly findManyAirlinesUseCase: FindManydAirlinesUseCase,
    private readonly findOneAirlineUseCase: FindOneAirlineUseCase,
    private readonly deleteOneAirlineUseCase: DeleteOneAirlineUseCase,
    private readonly updateOneAirlineUseCase: UpdateOneAirlineUseCase,
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

  @Patch(':id')
  updateAirline(
    @Param('id') id: string,
    @Body() updateOneAirlineDto: UpdateOneAirlineDto,
  ) {
    return this.updateOneAirlineUseCase.execute(id, updateOneAirlineDto);
  }
}
