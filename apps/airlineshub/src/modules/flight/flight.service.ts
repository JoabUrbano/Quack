import { Injectable } from "@nestjs/common";

@Injectable()
export class FlightService {
    constructor() {}

    getFlightDetails(flight: number, day: Date): string {
        return `Details for flight ${flight} on ${day}.`;
    }
}