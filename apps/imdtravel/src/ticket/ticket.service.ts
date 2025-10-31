import { Injectable } from '@nestjs/common';
import { BuyTicketDto } from '@imdtravel/ticket/dtos/buyTicket.dto';
import { AirlineHubGateway } from '@app/shared';
import { ExchangeGateway } from '@app/shared/exchange.gateway';
import { FlightDto } from '@app/shared/types/fligt.dto';

@Injectable()
export class TicketService {
  constructor(
    private airlineHubGateway: AirlineHubGateway,
    private exchangeGateway: ExchangeGateway,
  ) {}

  async buyTicket(input: BuyTicketDto): Promise<FlightDto> {
    const { flight: flightNumber, day } = input;

    const flight = await this.airlineHubGateway.getFlight(flightNumber, day);

    const exchange = await this.exchangeGateway.getRandomNumberExchange();

    const realToDolar = Math.round(flight.value / exchange);

    return {
      ...flight,
      valueInDolar: realToDolar,
    };
  }
}
