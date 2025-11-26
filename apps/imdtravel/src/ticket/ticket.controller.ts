import { Body, Controller, Post, UseGuards, UseInterceptors, Req } from "@nestjs/common";
import { TicketService } from "@imdtravel/ticket/ticket.service";
import { BuyTicketDto } from "@imdtravel/ticket/dtos/buyTicket.dto";
import { FaultSimulation } from "@app/shared/decorators/faultSimulation.decorator";
import { TimeoutFault } from "@app/shared/faults/timeoutFault";
import { FaultInterceptor } from "@app/shared/interceptors/fault.interceptor";
import { AuthGuard } from "@app/shared/guards";
import { User, UserEntity } from "@app/shared/decorators";
import { Request } from "express";

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    // @UseInterceptors(FaultInterceptor)
    @UseGuards(AuthGuard)
    @Post('buyTicket')
    // @FaultSimulation(new TimeoutFault({ durationMs: 5000, probability: 20 }))
    buyTicket(@Body() buyTicketDto: BuyTicketDto, @User() user: UserEntity, @Req() request: Request): any {
        const accessToken = request.cookies?.accessToken;
        const refreshToken = request.cookies?.refreshToken;

        return this.ticketService.buyTicket({
            ...buyTicketDto,
            userId: user.sub,
            auth: {
                accessToken,
                refreshToken,
            }
        });
    }
}
