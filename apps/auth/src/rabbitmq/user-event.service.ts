import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '@app/shared/modules/rabbitmq/rabbitmq.service';
import { UserCreatedEventDto } from '@app/shared/events';
import { USER_EXCHANGE, USER_ROUTING_KEY } from '@app/shared/constants/rabbitmq';


@Injectable()
export class UserEventService {
  constructor(private rabbitmqService: RabbitMQService) { }

  async publishUserCreated(event: UserCreatedEventDto): Promise<void> {
    await this.rabbitmqService.publish(event, {
      exchange: USER_EXCHANGE,
      routingKey: USER_ROUTING_KEY,
      persistent: true,
    });
  }
}

