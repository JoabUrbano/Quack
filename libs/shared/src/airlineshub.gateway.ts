import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class AirlineHubGateway {
    constructor(private httpService: HttpService) {}

    getHello(): string {
        return 'Hello from AirlineHub Gateway!';
    }
    async getFlight(flight: number, day: Date): Promise<any> {
        const response = this.httpService.get(`http://localhost:3001/flights/${flight}?day=${day}`);
        const res = await lastValueFrom(response);
        return res.data;
    }
}