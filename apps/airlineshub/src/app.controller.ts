import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from '@airlineshub/app.service';
import { SellTicketDto } from '@app/shared/dtos/sellTicket.dto';
import { SellTicketUseCase } from '@airlineshub/usecases/sellTicket.usecase';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sellTicket: SellTicketUseCase,
  ) {}

  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is running' })
  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @Post('sell')
  sell(@Body() body: SellTicketDto) {
    return this.sellTicket.execute(body);
  }
}
