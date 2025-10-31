import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export interface IGetRandomNumberExchangeParams {
  min: number;
  max: number;
}

@Injectable()
export class ExchangeGateway {
  constructor(private httpservice: HttpService) {}

  async getRandomNumberExchange(
    params: IGetRandomNumberExchangeParams,
  ): Promise<number> {
    const { min, max } = params;

    console.log('[shared] meu env => ', process.env.EXCHANGE_URL);
    const response = this.httpservice.get(
      `${process.env.EXCHANGE_URL}/random/exchange/convert`,
      {
        params: {
          min,
          max,
        },
      },
    );
    
    const res = await lastValueFrom(response);
    
    return res.data;
  }
}
