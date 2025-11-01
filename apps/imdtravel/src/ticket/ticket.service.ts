import { Injectable } from '@nestjs/common';
import { BuyTicketDto } from '@imdtravel/ticket/dtos/buyTicket.dto';
import { AirlineHubGateway } from '@app/shared';
import { ExchangeGateway } from '@app/shared/exchange.gateway';
import { FlightDto } from '@app/shared/types/fligt.dto';
import { FidelityGateway } from '@app/shared/fidelity.gateway';

@Injectable()
export class TicketService {
  constructor(
    private airlineHubGateway: AirlineHubGateway,
    private exchangeGateway: ExchangeGateway,
    private fidelityGateway: FidelityGateway
  ) {}

  async buyTicket(input: BuyTicketDto): Promise<FlightDto> {
    const { flight: flightNumber, day, userId } = input;

    const flight = await this.airlineHubGateway.getFlight(flightNumber, day);

    const exchange = await this.exchangeGateway.getRandomNumberExchange();

    const realToDolar = Math.round(flight.value / exchange);
    const bonusParams = {
      value: flight.value*1/10,
      user: userId
    }
    const bonus = await this.fidelityGateway.createBonus(bonusParams);
    console.log(bonus);

    return {
      ...flight,
      valueInDolar: realToDolar,
    };
  }
}
