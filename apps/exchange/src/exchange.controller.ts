import { Controller, Get, UseGuards } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { AuthGuard } from '@app/shared/guards';
import { Public } from '@app/shared/decorators';

@Controller()
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.exchangeService.getHello();
  }
}
