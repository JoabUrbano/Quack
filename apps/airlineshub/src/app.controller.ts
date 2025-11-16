import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from '@airlineshub/app.service';
import { SellTicketDto } from '@app/shared/dtos/sellTicket.dto';
import { SellTicketUseCase } from '@airlineshub/usecases/sellTicket.usecase';
import { FailStateRequest03 } from '@app/shared/states/failStateRequest03';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sellTicket: SellTicketUseCase,
    public failStateRequest03: FailStateRequest03
  ) { }

  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is running' })
  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @Post('sell')
  async sell(@Body() body: SellTicketDto) {
    console.log('Received sell ticket request:', body);
    
    if (body.ft) {
      this.failStateRequest03.probability()
      if (this.failStateRequest03.request03State) {
        await new Promise((res, rej) => {
          setTimeout(() => {
            res(null)
          }, 5000)
        })
      }
    }

    return this.sellTicket.execute(body);
  }
}
