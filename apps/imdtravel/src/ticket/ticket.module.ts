import { Module } from '@nestjs/common';
import { TicketService } from '@imdtravel/ticket/ticket.service';
import { TicketController } from '@imdtravel/ticket/ticket.controller';
import { SharedModule } from '@app/shared';
import { RabbitMQModule } from '@app/shared/modules/rabbitmq/rabbitmq.module';
import { FaultInterceptor } from '@app/shared/interceptors/fault.interceptor';
@Module({
  imports: [SharedModule, RabbitMQModule],
  controllers: [TicketController],
  providers: [TicketService, FaultInterceptor],
})
export class TicketModule { }
