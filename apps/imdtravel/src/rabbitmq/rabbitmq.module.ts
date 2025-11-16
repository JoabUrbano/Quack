import { Global, Module } from '@nestjs/common';
import { TicketEventService } from '@imdtravel/rabbitmq/ticket-event.service';
import { TicketPurchasedConsumerService } from '@imdtravel/rabbitmq/ticket-purchased-consumer.service';
import { RabbitMQModule as SharedRabbitMQModule } from '@app/shared/modules/rabbitmq/rabbitmq.module';
import { RabbitMQService } from '@app/shared/modules/rabbitmq/rabbitmq.service';

@Global()
@Module({
  imports: [SharedRabbitMQModule],
  providers: [RabbitMQService, TicketEventService, TicketPurchasedConsumerService],
  exports: [RabbitMQService, TicketEventService, TicketPurchasedConsumerService],
})
export class RabbitMQModule { }
