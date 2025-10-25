import { Injectable } from "@nestjs/common";

@Injectable()
export class TicketService {
  constructor() {}

    buyTicket(flight: string, day: string, user: string): string {
        return `Ticket purchased successfully for flight ${flight} on ${day} by user ${user}!`;
    }
}