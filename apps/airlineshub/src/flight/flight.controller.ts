import { Body, Controller, Get } from "@nestjs/common";
import { FlightService } from "./flight.service";
import { GetFlightDto } from "./dtos/getFlight.sto";

@Controller('flights')
export class FlightController {
    constructor(private readonly flightService: FlightService) {}
    
    @Get('flight')
    getFlight(
        @Body() body: GetFlightDto
    ): string {
        return this.flightService.getFlightDetails(body.flight, body.day);
    }
}