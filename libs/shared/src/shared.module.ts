import { Module } from '@nestjs/common';
import { AirlineHubGateway } from './airlineshub.gateway';
import { HttpModule } from '@nestjs/axios';
import { ExchangeGateway } from './exchange.gateway';
import { FidelityGateway } from './fidelity.gateway';
import { FailStateRequest01 } from './states/failStateRequest01';
import { FailStateRequest02 } from './states/failStateRequest02';
import { FailStateRequest03 } from './states/failStateRequest03';
import { FailStateRequest04 } from './states/failStateRequest04';
import { RabbitMQModule } from '@app/shared/modules/rabbitmq/rabbitmq.module';
import { RedisModule } from '@app/shared/infra/redis/redis.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [HttpModule, RedisModule, RabbitMQModule],
  providers: [
    AirlineHubGateway,
    ExchangeGateway,
    FidelityGateway,
    FailStateRequest01,
    FailStateRequest02,
    FailStateRequest03,
    FailStateRequest04,
    JwtAuthGuard,
  ],
  exports: [
    AirlineHubGateway,
    ExchangeGateway,
    FidelityGateway,
    FailStateRequest01,
    FailStateRequest02,
    FailStateRequest03,
    FailStateRequest04,
    RedisModule,
    RabbitMQModule,
    JwtAuthGuard,
  ],
})
export class SharedModule { }
