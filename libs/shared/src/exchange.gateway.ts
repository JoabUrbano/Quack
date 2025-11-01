import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExchangeGateway {
  constructor(private httpservice: HttpService) {}

  async conversionRate(): Promise<number> {
    const response = this.httpservice.get(
      `${process.env.EXCHANGE_URL}/random/exchange/convert`,
    );

    const res = await lastValueFrom(response);

    return res.data;
  }
}
