import { Module } from '@nestjs/common';
import { TicketService } from '@imdtravel/ticket/ticket.service';
import { TicketController } from '@imdtravel/ticket/ticket.controller';
import { SharedModule } from '@app/shared';
import { RabbitMQModule } from '@app/shared/modules/rabbitmq/rabbitmq.module';

@Module({
  imports: [SharedModule, RabbitMQModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
