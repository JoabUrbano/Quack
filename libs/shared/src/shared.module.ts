import { Module } from '@nestjs/common';
import { AirlineHubGateway } from './airlineshub.gateway';
import { HttpModule } from '@nestjs/axios';
import { ExchangeGateway } from './exchange.gateway';
import { FidelityGateway } from './fidelity.gateway';
import { FailStateRequest01 } from './states/failStateRequest01';
import { AuthGateway } from './auth.gateway';
import { FailStateRequest02 } from './states/failStateRequest02';
import { FailStateRequest03 } from './states/failStateRequest03';
import { FailStateRequest04 } from './states/failStateRequest04';
import { RabbitMQModule } from '@app/shared/modules/rabbitmq/rabbitmq.module';
import { RedisModule } from '@app/shared/infra/redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [HttpModule, RedisModule, RabbitMQModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AIRLINESHUB_URL: Joi.string().uri().required(),
        IMDTRAVEL_URL: Joi.string().uri().required(),
        EXCHANGE_URL: Joi.string().uri().required(),
        FIDELITY_URL: Joi.string().uri().required(),
        AUTH_URL: Joi.string().uri().required(),
      }),
    }),

  ],
  providers: [
    AuthGateway,
    AirlineHubGateway,
    ExchangeGateway,
    FidelityGateway,
    FailStateRequest01,
    FailStateRequest02,
    FailStateRequest03,
    FailStateRequest04,
  ],
  exports: [
    AuthGateway,
    AirlineHubGateway,
    ExchangeGateway,
    FidelityGateway,
    FailStateRequest01,
    FailStateRequest02,
    FailStateRequest03,
    FailStateRequest04,
    RedisModule,
    RabbitMQModule,
  ],
})
export class SharedModule { }
