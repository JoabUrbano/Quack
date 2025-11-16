import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '@app/shared/modules/rabbitmq/rabbitmq.service';
import { TicketPurchasedEventDto } from '@app/shared/events/ticketPurchasedEventDto';

export const TICKET_EXCHANGE = 'ticket_purchased';
export const TICKET_ROUTING_KEY = 'ticket.purchased';

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

