import { Module } from '@nestjs/common';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';
import { RandomExchangeModule } from './modules/randomExchange/randomExchange.module';
import { SharedModule } from '@app/shared';

@Module({
  imports: [RandomExchangeModule, SharedModule],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {}
