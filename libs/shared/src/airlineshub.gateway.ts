import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AirlineDto } from 'libs/shared/src/types/fligt.dto';

@Injectable()
export class AirlineHubGateway {
  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Hello from AirlineHub Gateway!';
  }

  async getFlight(flight: number, day: Date): Promise<AirlineDto> {
    try {
      const response = this.httpService.get<AirlineDto>(
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
      console.log(error.message);
      throw new Error('Opps, something went wrong with the AirlineHub API!');
    }
  }
}
