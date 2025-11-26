import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '@app/shared/modules/rabbitmq/rabbitmq.service';
import { TicketPurchasedEventDto } from '@app/shared/events/ticketPurchasedEventDto';
import { TICKET_EXCHANGE, TICKET_ROUTING_KEY } from '@app/shared/constants/rabbitmq';


@Injectable()
export class TicketEventService {
  constructor(private rabbitmqService: RabbitMQService) {}

  async publishTicketPurchased(event: TicketPurchasedEventDto): Promise<void> {
    await this.rabbitmqService.publish(event, {
      exchange: TICKET_EXCHANGE,
      routingKey: TICKET_ROUTING_KEY,
      persistent: true,
    });
  }
}

