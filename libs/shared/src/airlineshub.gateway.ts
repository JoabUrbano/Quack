import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class AirlineHubGateway {
    constructor(private httpService: HttpService) {}

    getHello(): string {
        return 'Hello from AirlineHub Gateway!';
    }
    getFlight(flightId: number, day: Date): Observable<AxiosResponse<any>> {
        const response = this.httpService.get(`http://localhost:3001/airlines/flight/${flightId}?day=${day}`);
        return response;
    }
}