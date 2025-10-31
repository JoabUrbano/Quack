import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { FlightDto } from 'libs/shared/src/types/fligt.dto';
import { AirTicketDto } from '@app/shared/types/airTicket.dto';
import { SellTicketDto } from '@app/shared/dtos/sellTicket.dto';

@Injectable()
export class AirlineHubGateway {
  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Hello from AirlineHub Gateway!';
  }

  async getFlight(flight: number, day: Date): Promise<FlightDto> {
    try {
      const response = this.httpService.get<FlightDto>(
        `${process.env.AIRLINESHUB_URL}/flights/flight/`,
        {
          params: {
            flight,
            day,
          },
        },
      );

      const res = await lastValueFrom(response);

      return res.data;
    } catch (error) {
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
