import { HttpService } from '@nestjs/axios';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { lastValueFrom, throwError, timeout, TimeoutError } from 'rxjs';
import { FlightDto } from 'libs/shared/src/types/fligt.dto';
import { AirTicketDto } from '@app/shared/types/airTicket.dto';
import { SellTicketDto } from '@app/shared/dtos/sellTicket.dto';
import { AuthParams } from '@app/shared/dtos/auth.params';
import { AirlinesHubExceptionTimeoutError } from './exceptions/airlineshubGatewayException';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AirlineHubGateway {
  constructor(private httpService: HttpService, private configService: ConfigService) { }

  getHello(): string {
    return 'Hello from AirlineHub Gateway!';
  }

  async getFlight(flight: number, day: Date, ft: boolean, cf: boolean, auth: AuthParams): Promise<FlightDto> {
    console.log(`[AirlineHubGateway] params => ${JSON.stringify(
      {
        ft: ft,
        cf: cf,
      }
    )}`)

    try {
      let response$ = this.httpService.get<FlightDto>(
        `${this.configService.get<string>('AIRLINESHUB_URL')}/flights/flight/`,
        {
          params: {
            flight,
            day,
            cf
          },
          headers: {
            Cookie: `accessToken=${auth.accessToken};refreshToken=${auth.refreshToken}`,
          },
        },
      )

      if (ft) {
        response$ = response$.pipe(timeout({
          first: 250,
          with: () => throwError(() => new AirlinesHubExceptionTimeoutError())
        }));
      }

      const res = await lastValueFrom(response$);

      return res.data;
    } catch (error) {
      if (error instanceof AirlinesHubExceptionTimeoutError) {
        throw new RequestTimeoutException("A requisição demorou mais do que deveria!")
      }
      console.log(error);

      throw new Error('Opps, something went wrong with the AirlineHub API!');
    }
  }

  async sellTicket(params: SellTicketDto, auth: AuthParams): Promise<AirTicketDto> {
    console.log(`[AirlineHubGateway] params => ${JSON.stringify(
      {
        ft: params.ft,
        cf: params.cf,
      }
    )}`)


    try {
      let response$ = this.httpService.post<AirTicketDto>(
        `${this.configService.get<string>('AIRLINESHUB_URL')}/sell`,
        params,
        {
          headers: {
            Cookie: `accessToken=${auth.accessToken};refreshToken=${auth.refreshToken}`,
          },
        },
      )

      if (params.ft) {
        response$ = response$.pipe(timeout({
          first: 250,
          with: () => throwError(() => new AirlinesHubExceptionTimeoutError())
        }));
      }

      const res = await lastValueFrom(response$);

      return res.data;
    } catch (error) {
      if (error instanceof AirlinesHubExceptionTimeoutError) {
        throw new RequestTimeoutException("A requisição demorou mais do que deveria!")
      }
      console.log(error);

      throw new Error('Ocorreu um erro ao vender o ticket na API do AirlinesHub');
    }

  }
}
