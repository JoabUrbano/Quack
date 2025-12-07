import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from '@app/shared/modules/rabbitmq/rabbitmq.service';
import { UserCreatedEventDto } from '@app/shared/events';
import { USER_EXCHANGE, USER_ROUTING_KEY } from '@app/shared/constants/rabbitmq';


@Injectable()
export class UserEventService implements OnModuleInit {
  private readonly logger = new Logger(UserEventService.name);
  
  async onModuleInit(): Promise<void> {
    try {
      await this.rabbitmqService.waitForConnection();
      await this.rabbitmqService.declareExchange(USER_EXCHANGE, 'topic');
      this.logger.log(`Exchange "${USER_EXCHANGE}" declared successfully`);
    } catch (error) {
      this.logger.error(`Failed to initialize user event service: ${error.message}`);
      throw error;
    }
  }

  
  constructor(private rabbitmqService: RabbitMQService) { }

  async publishUserCreated(event: UserCreatedEventDto): Promise<void> {
    await this.rabbitmqService.publish(event, {
      exchange: USER_EXCHANGE,
      routingKey: USER_ROUTING_KEY,
      persistent: true,
    });
  }
}

