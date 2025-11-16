import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExchangeGateway {
  constructor(private httpservice: HttpService) { }

  async conversionRate(): Promise<number> {
    try {
      const response = this.httpservice.get(
        `${process.env.EXCHANGE_URL}/random/exchange/convert`,
      );

      const res = await lastValueFrom(response);

      return res.data;
    } catch (error) {
      console.error('Error fetching conversion rate from Exchange API:', error);
      throw new Error('Ocorreu um erro ao buscar a cotação na API de Exchange');
    }

  }
}
