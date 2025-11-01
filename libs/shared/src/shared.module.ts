import { Module } from '@nestjs/common';
import { AirlineHubGateway } from './airlineshub.gateway';
import { HttpModule } from '@nestjs/axios';
import { ExchangeGateway } from './exchange.gateway';
import { FidelityGateway } from './fidelity.gateway';

@Module({
  imports: [HttpModule],
  providers: [AirlineHubGateway, ExchangeGateway, FidelityGateway],
  exports: [AirlineHubGateway, ExchangeGateway, FidelityGateway],
})
export class SharedModule {}
