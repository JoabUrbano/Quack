import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { RabbitMQService } from '@app/shared/modules/rabbitmq/rabbitmq.service';
import { TicketPurchasedEventDto } from '@app/shared/events/ticketPurchasedEventDto';
import { TICKET_EXCHANGE, TICKET_ROUTING_KEY } from '@app/shared/constants/rabbitmq';


@Injectable()
export class TicketEventService implements OnModuleInit {
  private readonly logger = new Logger(TicketEventService.name);

  constructor(private rabbitmqService: RabbitMQService) { }

  async onModuleInit(): Promise<void> {
    try {
      await this.rabbitmqService.waitForConnection();
      await this.rabbitmqService.declareExchange(TICKET_EXCHANGE, 'topic');
      this.logger.log(`Exchange "${TICKET_EXCHANGE}" declared successfully`);
    } catch (error) {
      this.logger.error(`Failed to initialize ticket event service: ${error.message}`);
      throw error;
    }
  }

  async publishTicketPurchased(event: TicketPurchasedEventDto): Promise<void> {
    await this.rabbitmqService.publish(event, {
      exchange: TICKET_EXCHANGE,
      routingKey: TICKET_ROUTING_KEY,
      persistent: true,
    });
  }
}

