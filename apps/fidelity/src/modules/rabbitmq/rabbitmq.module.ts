import { Global, Module } from '@nestjs/common';
import { TicketEventService } from '@imdtravel/rabbitmq/ticket-event.service';
import { RabbitMQModule as SharedRabbitMQModule } from '@app/shared/modules/rabbitmq/rabbitmq.module';
import { RabbitMQService } from '@app/shared/modules/rabbitmq/rabbitmq.service';
import { TicketPurchasedConsumerService } from '@fidelity/modules/rabbitmq/ticket-purchased-consumer.service';

@Global()
@Module({
  imports: [SharedRabbitMQModule],
  providers: [RabbitMQService, TicketEventService, TicketPurchasedConsumerService],
  exports: [RabbitMQService, TicketEventService, TicketPurchasedConsumerService],
})
export class RabbitMQModule { }
