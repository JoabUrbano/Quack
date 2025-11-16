import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class FidelityGateway {
  constructor(private httpservice: HttpService) { }

  async createBonus(param: { user: string; value: number, ft: boolean }): Promise<string> {
    try {
      const response = this.httpservice.post<string>(
        `${process.env.FIDELITY_URL}/bonus`,
        {
          user: param.user,
          bonus: param.value,
          ft: param.ft
        },
      );

      const res = await lastValueFrom(response);

      return res.data;
    } catch (error) {
      console.error('Error creating bonus through Fidelity API:', error);
      throw new Error('Ocorreu um erro ao criar o bônus na API de Fidelity');
    }

  }
}
