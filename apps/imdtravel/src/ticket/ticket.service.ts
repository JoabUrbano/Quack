import { Injectable, Logger } from '@nestjs/common';
import { AirlineHubGateway } from '@app/shared';
import { ExchangeGateway } from '@app/shared/exchange.gateway';
import { FidelityGateway } from '@app/shared/fidelity.gateway';
import { TicketEventService } from '@imdtravel/rabbitmq/ticket-event.service';
import { AuthParams } from '@app/shared/dtos/auth.params';

export type sellTicketReturn = {
  transactionId: string
}

export class BuyTicketParams {
    flight: number;
    day: Date;
    userId: string;
    ft?: boolean;
    auth: AuthParams;
}

@Injectable()
export class TicketService {
  private readonly logger = new Logger(TicketService.name);

  constructor(
    private airlineHubGateway: AirlineHubGateway,
    private exchangeGateway: ExchangeGateway,
    private fidelityGateway: FidelityGateway,
    private ticketEventService: TicketEventService,
  ) { }

  async buyTicket(input: BuyTicketParams): Promise<sellTicketReturn> {
    const { flight: flightNumber, day, userId, ft, auth } = input;

    const flight = await this.airlineHubGateway.getFlight(flightNumber, day, ft, auth);
      
    const conversionRate = await this.exchangeGateway.conversionRate(ft, auth);

    const airticket = await this.airlineHubGateway.sellTicket({
      day,
      flight: flightNumber,
      finalValue: flight.value,
      userId: input.userId,
      ft
    }, auth);

    const valueInDolar = Math.round(flight.value / conversionRate);

    await this.ticketEventService.publishTicketPurchased({
      transactionId: airticket.id,
      userId: userId,
      flightNumber: flightNumber,
      day: day,
      value: flight.value,
      timestamp: new Date(),
    });


    return {
      transactionId: airticket.id
    };
  }
}

