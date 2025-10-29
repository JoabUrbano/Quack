import { Module } from '@nestjs/common';
import { AirlineHubGateway } from './airlineshub.gateway';
import { HttpModule } from '@nestjs/axios';
import { ExchangeGateway } from './exchange.gateway';

@Module({
  imports: [HttpModule],
  providers: [AirlineHubGateway, ExchangeGateway],
  exports: [AirlineHubGateway, ExchangeGateway],
})
export class SharedModule {}
