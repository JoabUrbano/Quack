import { Global, Module } from '@nestjs/common';
import { TicketEventService } from '@imdtravel/rabbitmq/ticket-event.service';
import { RabbitMQModule as SharedRabbitMQModule } from '@app/shared/modules/rabbitmq/rabbitmq.module';
import { RabbitMQService } from '@app/shared/modules/rabbitmq/rabbitmq.service';
import { UserCreatedConsumerService } from '@imdtravel/rabbitmq/user-created-consumer.service';
import { PrismaService } from '@imdtravel/prisma.service';

@Global()
@Module({
  imports: [SharedRabbitMQModule],
  providers: [RabbitMQService, TicketEventService, UserCreatedConsumerService, PrismaService],
  exports: [RabbitMQService, TicketEventService, UserCreatedConsumerService],
})
export class RabbitMQModule { }
