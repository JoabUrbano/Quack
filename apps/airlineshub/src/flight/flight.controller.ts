import { Body, Controller, Get } from "@nestjs/common";
import { FlightService } from "./flight.service";

@Controller('flights')
export class FlightController {
    constructor(private readonly flightService: FlightService) {}
    
    @Get('flight')
    getFlight(
        @Body() body: { flight: string; day: string }
    ): string {
        return this.flightService.getFlightDetails(body.flight, body.day);
    }
}