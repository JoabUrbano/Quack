import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ExchangeValueIsValid } from './utils/exchangeValueIsValid';
import { RedisClient } from '@app/shared/infra/redis/redis';

@Injectable()
export class ExchangeGateway {
  constructor(private httpservice: HttpService, private readonly redisClient: RedisClient) { }

  async conversionRate(ft: boolean): Promise<number> {
    try {
      const response = this.httpservice.get(
        `${process.env.EXCHANGE_URL}/random/exchange/convert`,
        {
          params: { ft }
        }
      );
      const res = await lastValueFrom(response);

      const conversionRate = res.data;


      if (!ExchangeValueIsValid(conversionRate)) {
        const lastValuesExchange = await this.redisClient.getList('exchange:history', -10, -1);
        console.log('Using cached exchange values from Redis:', lastValuesExchange);


        const average = lastValuesExchange.reduce((sum, val) => sum + parseFloat(val.toString()), 0) / lastValuesExchange.length;

        return average
      }

      await this.redisClient.rpush('exchange:history', conversionRate);
      await this.redisClient.lTrim('exchange:history', -10, -1);

      return conversionRate;
    } catch (error) {
      console.error('Error fetching conversion rate from Exchange API:', error);
      throw new Error('Ocorreu um erro ao buscar a cotação na API de Exchange');
    }

  }
}
