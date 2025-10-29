import { Module } from '@nestjs/common';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';
import { RandomExchangeModule } from './modules/randomExchange/randomExchange.module';

@Module({
  imports: [RandomExchangeModule],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {}
