import { Global, Module } from '@nestjs/common';
import { TicketEventService } from '@imdtravel/rabbitmq/ticket-event.service';
import { RabbitMQModule as SharedRabbitMQModule } from '@app/shared/modules/rabbitmq/rabbitmq.module';
import { RabbitMQService } from '@app/shared/modules/rabbitmq/rabbitmq.service';

@Global()
@Module({
  imports: [SharedRabbitMQModule],
  providers: [RabbitMQService, TicketEventService],
  exports: [RabbitMQService, TicketEventService],
})
export class RabbitMQModule { }
