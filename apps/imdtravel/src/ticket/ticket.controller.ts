import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { TicketService } from "@imdtravel/ticket/ticket.service";
import { BuyTicketDto } from "@imdtravel/ticket/dtos/buyTicket.dto";
import { FaultSimulation } from "@app/shared/decorators/faultSimulation.decorator";
import { TimeoutFault } from "@app/shared/faults/timeoutFault";
import { FaultInterceptor } from "@app/shared/interceptors/fault.interceptor";

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    // @UseInterceptors(FaultInterceptor)
    @Post('buyTicket')
    // @FaultSimulation(new TimeoutFault({ durationMs: 5000, probability: 20 }))
    buyTicket(@Body() buyTicketDto: BuyTicketDto): any {
        console.log('[buyTicketDto]:', buyTicketDto);

        return this.ticketService.buyTicket(buyTicketDto);
    }
}
