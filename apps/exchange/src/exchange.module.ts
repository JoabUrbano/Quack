import { Module } from '@nestjs/common';
import { ExchangeController } from '@exchange/exchange.controller';
import { ExchangeService } from '@exchange/exchange.service';
import { RandomExchangeModule } from '@exchange/modules/randomExchange/randomExchange.module';
import { SharedModule } from '@app/shared';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/shared/guards';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), RandomExchangeModule, SharedModule],
  controllers: [ExchangeController],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard
  }, ExchangeService],
})
export class ExchangeModule { }
