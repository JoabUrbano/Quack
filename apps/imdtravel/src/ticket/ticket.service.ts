import { Injectable } from '@nestjs/common';
import { BuyTicketDto } from '@imdtravel/ticket/dtos/buyTicket.dto';
import { AirlineHubGateway } from '@app/shared';
import { ExchangeGateway } from '@app/shared/exchange.gateway';
import { FidelityGateway } from '@app/shared/fidelity.gateway';

@Injectable()
export class TicketService {
  constructor(
    private airlineHubGateway: AirlineHubGateway,
    private exchangeGateway: ExchangeGateway,
    private fidelityGateway: FidelityGateway,
  ) {}

  // TODO: Definir o retorno correto do método
  async buyTicket(input: BuyTicketDto): Promise<any> {
    const { flight: flightNumber, day, userId } = input;

    const flight = await this.airlineHubGateway.getFlight(flightNumber, day);

    const conversionRate = await this.exchangeGateway.conversionRate();

    const airticket = await this.airlineHubGateway.sellTicket({
      day,
      flight: flightNumber,
      finalValue: flight.value,
      userId: input.userId,
    });

    const valueInDolar = Math.round(flight.value / conversionRate);

    const bonusParams = {
      value: Math.round((flight.value * 1) / 10),
      user: userId,
    };

    const bonus = await this.fidelityGateway.createBonus(bonusParams);

    // return {
    //   flight,
    //   airticket,
    //   valueInDolar,
    //   bonus,
    // };
    return {
      transactionId: airticket.id,
    };
  }
}
