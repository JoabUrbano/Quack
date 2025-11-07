import { Module } from '@nestjs/common';
import { AirlineHubGateway } from './airlineshub.gateway';
import { HttpModule } from '@nestjs/axios';
import { ExchangeGateway } from './exchange.gateway';
import { FidelityGateway } from './fidelity.gateway';
import { FailStateRequest01 } from './states/failStateRequest01';

@Module({
  imports: [HttpModule],
  providers: [AirlineHubGateway, ExchangeGateway, FidelityGateway, FailStateRequest01],
  exports: [AirlineHubGateway, ExchangeGateway, FidelityGateway, FailStateRequest01],
})
export class SharedModule {}
