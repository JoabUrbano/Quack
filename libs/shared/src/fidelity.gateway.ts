import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, throwError, timeout } from 'rxjs';
import { AuthParams } from '@app/shared/dtos/auth.params';
import { FidelityExceptionTimeoutError } from './exceptions/fidelityGatewayException';

@Injectable()
export class FidelityGateway {
  constructor(private httpservice: HttpService, private configService: ConfigService) { }

  async createBonus(param: { user: string; value: number, ft: boolean, cf: boolean, }, auth: AuthParams): Promise<string> {
    try {
      let response$ = this.httpservice.post<string>(
        `${this.configService.get<string>('FIDELITY_URL')}/bonus`,
        {
          user: param.user,
          bonus: param.value,
          cf: param.cf
        },
        {
          headers: {
            Cookie: `accessToken=${auth.accessToken};refreshToken=${auth.refreshToken}`,
          },
        },
      );

      if (param.ft) {
        response$ = response$.pipe(timeout({
          first: 2000,
          with: () => throwError(() => new FidelityExceptionTimeoutError())
        }));
      }

      const res = await lastValueFrom(response$);

      return res.data;
    } catch (error) {
      console.error('Error creating bonus through Fidelity API:', error);
      throw new Error('Ocorreu um erro ao criar o bônus na API de Fidelity');
    }

  }
}
