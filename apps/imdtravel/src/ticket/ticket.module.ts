import { Module } from '@nestjs/common';
import { TicketService } from '@imdtravel/ticket/ticket.service';
import { TicketController } from '@imdtravel/ticket/ticket.controller';
import { SharedModule } from '@app/shared';

@Module({
  imports: [SharedModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
