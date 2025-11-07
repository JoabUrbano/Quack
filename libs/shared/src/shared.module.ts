import { Module } from '@nestjs/common';
import { AirlineHubGateway } from './airlineshub.gateway';
import { HttpModule } from '@nestjs/axios';
import { ExchangeGateway } from './exchange.gateway';
import { FidelityGateway } from './fidelity.gateway';
import { FailStateRequest01 } from './states/failStateRequest01';
import { FailStateRequest02 } from './states/failStateRequest02';

@Module({
  imports: [HttpModule],
  providers: [AirlineHubGateway, ExchangeGateway, FidelityGateway, FailStateRequest01, FailStateRequest02],
  exports: [AirlineHubGateway, ExchangeGateway, FidelityGateway, FailStateRequest01, FailStateRequest02],
})
export class SharedModule {}
