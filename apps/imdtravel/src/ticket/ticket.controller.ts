import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TicketService } from "./ticket.service";

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Post('buyTicket')
    buyTicket(
       @Body() body: { flight: string; day: string; user: string }
    ): string {
        return this.ticketService.buyTicket(body.flight, body.day, body.user);
    }
}