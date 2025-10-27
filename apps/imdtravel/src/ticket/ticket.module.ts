import { Module } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { TicketController } from "./ticket.controller";
import { SharedModule } from "@app/shared";

@Module({
    imports: [SharedModule],
    controllers: [TicketController],
    providers: [TicketService]
})
export class TicketModule {}