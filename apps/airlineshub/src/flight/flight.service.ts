import { Injectable } from "@nestjs/common";

@Injectable()
export class FlightService {
    constructor() {}

    getFlightDetails(flight: string, day: string): string {
        return `Details for flight ${flight} on ${day}.`;
    }
}