import { Injectable } from '@nestjs/common';
import { BuyTicketDto } from '@imdtravel/ticket/dtos/buyTicket.dto';

@Injectable()
export class TicketService {
  constructor() {}

  buyTicket(input: BuyTicketDto): string {
    const { flight, day, userId: user } = input;

    return `Ticket purchased successfully for flight ${flight} on ${day} by user ${user}!`;
  }
}
