import { Injectable } from '@nestjs/common';
import { BuyTicketDto } from '@imdtravel/ticket/dtos/buyTicket.dto';
import { AirlineHubGateway } from '@app/shared';
import { ExchangeGateway } from '@app/shared/exchange.gateway';
import { AirlineDto } from '@app/shared/types/fligt.dto';

@Injectable()
export class TicketService {
  constructor(
    private airlineHubGateway: AirlineHubGateway,
    private exchangeGateway: ExchangeGateway,
  ) {}

  async buyTicket(input: BuyTicketDto): Promise<AirlineDto> {
    const { flight: flightNumber, day } = input;

    const flight = await this.airlineHubGateway.getFlight(flightNumber, day);

    const exchange = await this.exchangeGateway.getRandomNumberExchange({
      min: 1,
      max: 100,
    });

    return flight;
  }
}
