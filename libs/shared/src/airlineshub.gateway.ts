import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AirlineHubGateway {
    constructor(private httpService: HttpService) {}

    getHello(): string {
        return 'Hello from AirlineHub Gateway!';
    }
    async getFlight(flight: number, day: Date): Promise<any> {
        console.log(process.env.AIRLINESHUB_URL)
        const response = this.httpService.get(`${process.env.AIRLINESHUB_URL}/flights/${flight}?day=${day}`);
        const res = await lastValueFrom(response);
        return res.data;
    }
}