import { Module } from '@nestjs/common';
import { ExchangeController } from '@exchange/exchange.controller';
import { ExchangeService } from '@exchange/exchange.service';
import { RandomExchangeModule } from '@exchange/modules/randomExchange/randomExchange.module';
import { SharedModule } from '@app/shared';

@Module({
  imports: [RandomExchangeModule, SharedModule],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule { }
