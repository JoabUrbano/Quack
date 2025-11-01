import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class FidelityGateway {
  constructor(private httpservice: HttpService) {}

  async createBonus(param: { user: string; value: number }): Promise<string> {
    const response = this.httpservice.post<string>(
      `${process.env.FIDELITY_URL}/bonus`,
      {
        user: param.user,
        bonus: param.value,
      },
    );

    const res = await lastValueFrom(response);

    return res.data;
  }
}
