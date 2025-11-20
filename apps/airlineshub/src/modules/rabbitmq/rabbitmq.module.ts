import { Global, Module } from '@nestjs/common';
import { UserCreatedConsumerService } from '@airlineshub/modules/rabbitmq/user-created-consumer.service';
import { RabbitMQModule as SharedRabbitMQModule } from '@app/shared/modules/rabbitmq/rabbitmq.module';
import { RabbitMQService } from '@app/shared/modules/rabbitmq/rabbitmq.service';

@Global()
@Module({
  imports: [SharedRabbitMQModule],
  providers: [RabbitMQService, UserCreatedConsumerService,],
  exports: [RabbitMQService, UserCreatedConsumerService,],
})
export class RabbitMQModule { }
