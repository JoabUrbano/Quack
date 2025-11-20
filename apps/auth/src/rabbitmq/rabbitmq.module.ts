import { Global, Module } from '@nestjs/common';
import { UserEventService } from '@auth/rabbitmq/user-event.service';
import { RabbitMQModule as SharedRabbitMQModule } from '@app/shared/modules/rabbitmq/rabbitmq.module';
import { RabbitMQService } from '@app/shared/modules/rabbitmq/rabbitmq.service';

@Global()
@Module({
  imports: [SharedRabbitMQModule],
  providers: [RabbitMQService, UserEventService],
  exports: [RabbitMQService, UserEventService],
})
export class RabbitMQModule { }
