import { Module } from '@nestjs/common';
import { AirlineHubGateway } from './airlineshub.gateway';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AirlineHubGateway],
  exports: [AirlineHubGateway],
})
export class SharedModule {}
