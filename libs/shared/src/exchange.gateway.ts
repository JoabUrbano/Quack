import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { createClient } from 'redis';
import { ExchangeValueIsValid } from './utils/exchangeValueIsValid';

@Injectable()
export class ExchangeGateway {
  constructor(private httpservice: HttpService) { }

  async conversionRate(ft: boolean): Promise<number> {
    try {
      const client = createClient({
        socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
      password: process.env.REDIS_PASSWORD,
      });

      client.on('error', err => console.log('Redis Client Error', err));

      await client.connect();

      const response = this.httpservice.get(
        `${process.env.EXCHANGE_URL}/random/exchange/convert`,
        {
          params: {ft}
        }
      );
      const res = await lastValueFrom(response);

      if(!ExchangeValueIsValid(res.data)) {
        const lastValuesExchange = await client.lRange('exchangeHistory', -10, -1);
        let average = 0;
        let count = 0;
        for(let value of lastValuesExchange) {
          count ++;
          average += parseFloat(value.toString());
        }
        return  average/count
      } else {
        await client.rPush('exchangeHistory', String(res.data));
        await client.lTrim('exchangeHistory', -10, -1);
      }

      return res.data;
    } catch (error) {
      console.error('Error fetching conversion rate from Exchange API:', error);
      throw new Error('Ocorreu um erro ao buscar a cotação na API de Exchange');
    }

  }
}
