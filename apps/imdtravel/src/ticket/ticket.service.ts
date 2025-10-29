import { Injectable } from '@nestjs/common';
import { BuyTicketDto } from '@imdtravel/ticket/dtos/buyTicket.dto';
import { AirlineHubGateway } from '@app/shared';
import { ExchangeGateway } from '@app/shared/exchange.gateway';

@Injectable()
export class TicketService {
  constructor(
    private airlineHubGateway: AirlineHubGateway,
    private exchangeGateway: ExchangeGateway
  ) {}

  async buyTicket(input: BuyTicketDto): Promise<any> {
    const { flight, day } = input;

    const res = await this.airlineHubGateway.getFlight(flight, day);
    const exchange = await this.exchangeGateway.getRandomNumberExchange();
    console.log(exchange)
    return res;
  }
}
