import { Injectable } from "@nestjs/common";

@Injectable()
export class TicketService {
  constructor() {}

    buyTicket(): string {
        return "Ticket purchased successfully!";
    }
}