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
import { CreateAirTicketDto } from '@airlineshub/modules/airtickets/dtos/createAirTicket.dto';
import { CreateAirTicketUseCase } from '@airlineshub/modules/airtickets/usecases/createAirTicket.usecase';
import { FindManyAirTicketsDto } from '@airlineshub/modules/airtickets/dtos/findManyAirTickets.dto';
import { FindManyAirTicketsUseCase } from '@airlineshub/modules/airtickets/usecases/findManyAirTickets.usecase';
import { FindOneAirTicketByIdUseCase } from '@airlineshub/modules/airtickets/usecases/findOneAirTicketById.usecase';
import { DeleteAirTicketUseCase } from '@airlineshub/modules/airtickets/usecases/deleteAirTicket.usecase';
import { UpdateAirTicketUseCase } from '@airlineshub/modules/airtickets/usecases/updateAirTicket.usecase';
import { UpdateAirTicketDto } from '@airlineshub/modules/airtickets/dtos/updateAirTicket.dto';

@ApiTags('Air Tickets')
@Controller('airtickets')
export class AirTicketsController {
  constructor(
    private readonly createAirTicketUseCase: CreateAirTicketUseCase,
    private readonly findManyAirTicketsUseCase: FindManyAirTicketsUseCase,
    private readonly findOneAirTicketByIdUseCase: FindOneAirTicketByIdUseCase,
    private readonly deleteAirTicketUseCase: DeleteAirTicketUseCase,
    private readonly updateAirTicketUseCase: UpdateAirTicketUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new air ticket' })
  @ApiResponse({ status: 201, description: 'Air ticket created successfully' })
  @ApiResponse({ status: 409, description: 'Ticket for this flight and seat already exists' })
  @Post()
  createAirTicket(@Body() createAirTicketDto: CreateAirTicketDto) {
    return this.createAirTicketUseCase.execute(createAirTicketDto);
  }

  @ApiOperation({ summary: 'Get all air tickets' })
  @ApiResponse({ status: 200, description: 'List of air tickets returned' })
  @Get()
  findAllAirTickets(@Query() findManyAirTicketsDto: FindManyAirTicketsDto) {
    return this.findManyAirTicketsUseCase.execute(findManyAirTicketsDto);
  }

  @ApiOperation({ summary: 'Get air ticket by ID' })
  @ApiResponse({ status: 200, description: 'Air ticket found' })
  @ApiResponse({ status: 404, description: 'Air ticket not found' })
  @Get(':id')
  findOneAirTicket(@Param('id') id: string) {
    return this.findOneAirTicketByIdUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Update an air ticket' })
  @ApiResponse({ status: 200, description: 'Air ticket updated successfully' })
  @ApiResponse({ status: 404, description: 'Air ticket not found' })
  @Patch(':id')
  updateAirTicket(
    @Param('id') id: string,
    @Body() updateAirTicketDto: UpdateAirTicketDto,
  ) {
    return this.updateAirTicketUseCase.execute(id, updateAirTicketDto);
  }

  @ApiOperation({ summary: 'Delete an air ticket' })
  @ApiResponse({ status: 200, description: 'Air ticket deleted successfully' })
  @ApiResponse({ status: 404, description: 'Air ticket not found' })
  @Delete(':id')
  deleteAirTicket(@Param('id') id: string) {
    return this.deleteAirTicketUseCase.execute(id);
  }
}
