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

  // TODO: Definir o retorno correto do método
  async buyTicket(input: BuyTicketDto): Promise<any> {
    const { flight: flightNumber, day } = input;

    const flight = await this.airlineHubGateway.getFlight(flightNumber, day);

    const conversionRate = await this.exchangeGateway.conversionRate();

    const airticket = await this.airlineHubGateway.sellTicket({
      day,
      flight: flightNumber,
      finalValue: flight.value,
      userId: input.userId,
    });

    const valueInDolar = Math.round(flight.value / conversionRate);

    return {
      flight,
      airticket,
      valueInDolar,
    };
  }
}
