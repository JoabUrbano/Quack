import { HttpService } from '@nestjs/axios';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { lastValueFrom, throwError, timeout, TimeoutError } from 'rxjs';
import { FlightDto } from 'libs/shared/src/types/fligt.dto';
import { AirTicketDto } from '@app/shared/types/airTicket.dto';
import { SellTicketDto } from '@app/shared/dtos/sellTicket.dto';
import { AirlinesHubExceptionTimeoutError } from './exceptions/airlineshubGatewayException';

@Injectable()
export class AirlineHubGateway {
  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Hello from AirlineHub Gateway!';
  }

 // function timeout()

  async getFlight(flight: number, day: Date, ft: boolean): Promise<FlightDto> {
    try {
      const response$ = this.httpService.get<FlightDto>(
        `${process.env.AIRLINESHUB_URL}/flights/flight/`,
        {
          params: {
            flight,
            day,
            ft
          },
        },
      ).pipe(timeout({
        each: 5000,
        with: () => throwError(() => new AirlinesHubExceptionTimeoutError())
      }));

      const res = await lastValueFrom(response$);

      return res.data;
    } catch (error) {
      if(error instanceof AirlinesHubExceptionTimeoutError) {
        throw new RequestTimeoutException("A requisição demorou mais do que deveria!")
      }
      console.log(error);

      throw new Error('Opps, something went wrong with the AirlineHub API!');
    }
  }

  async sellTicket(params: SellTicketDto): Promise<AirTicketDto> {
    const response = this.httpService.post<AirTicketDto>(
      `${process.env.AIRLINESHUB_URL}/sell`,
      params,
    );

    const res = await lastValueFrom(response);

    return res.data;
  }
}
