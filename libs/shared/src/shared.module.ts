import { Module } from '@nestjs/common';
import { AirlineHubGateway } from './airlineshub.gateway';
import { HttpModule } from '@nestjs/axios';
import { ExchangeGateway } from './exchange.gateway';
import { FidelityGateway } from './fidelity.gateway';
import { FailStateRequest01 } from './states/failStateRequest01';
import { FailStateRequest02 } from './states/failStateRequest02';
import { FailStateRequest03 } from './states/failStateRequest03';
import { FailStateRequest04 } from './states/failStateRequest04';

@Module({
  imports: [HttpModule],
  providers: [AirlineHubGateway, ExchangeGateway, FidelityGateway, FailStateRequest01, FailStateRequest02, FailStateRequest03, FailStateRequest04],
  exports: [AirlineHubGateway, ExchangeGateway, FidelityGateway, FailStateRequest01, FailStateRequest02, FailStateRequest03, FailStateRequest04],
})
export class SharedModule {}
