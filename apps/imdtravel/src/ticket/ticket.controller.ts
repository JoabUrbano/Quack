import { Body, Controller, Post } from "@nestjs/common";
import { TicketService } from "@imdtravel/ticket/ticket.service";
import { BuyTicketDto } from "@imdtravel/ticket/dtos/buyTicket.dto";

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Post('buyTicket')
    buyTicket(@Body() buyTicketDto: BuyTicketDto): any {
        return this.ticketService.buyTicket(buyTicketDto);
    }
}
