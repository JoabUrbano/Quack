import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { AuthParams } from '@app/shared/dtos/auth.params';

@Injectable()
export class FidelityGateway {
  constructor(private httpservice: HttpService, private configService: ConfigService) { }

  async createBonus(param: { user: string; value: number, ft: boolean }, auth: AuthParams): Promise<string> {
    try {
      const response = this.httpservice.post<string>(
        `${this.configService.get<string>('FIDELITY_URL')}/bonus`,
        {
          user: param.user,
          bonus: param.value,
          ft: param.ft
        },
        {
          headers: {
            Cookie: `accessToken=${auth.accessToken};refreshToken=${auth.refreshToken}`,
          },
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
