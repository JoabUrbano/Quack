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

    this.logger.log(`Iniciando compra de passagem: ${JSON.stringify(input)}`);

    const flight = await this.airlineHubGateway.getFlight(flightNumber, day, ft, auth);

    this.logger.log(`Detalhes do flight: ${JSON.stringify(flight)}`);

    const conversionRate = await this.exchangeGateway.conversionRate(ft, auth);

    this.logger.log(`Taxa de conversão: ${conversionRate}`);

    const airticket = await this.airlineHubGateway.sellTicket({
      day,
      flight: flightNumber,
      finalValue: flight.value,
      userId: input.userId,
      ft
    }, auth);

    this.logger.log(`Detalhes do airticket: ${JSON.stringify(airticket)}`);

    const valueInDolar = Math.round(flight.value / conversionRate);

    this.logger.log(`Valor em dólar: ${valueInDolar}`);

    try {
      const event = {
        transactionId: airticket.id,
        userId: userId,
        flightNumber: flightNumber,
        day: day,
        value: flight.value,
        timestamp: new Date(),
      }

      this.logger.log(`Enviando evento da compra do ticket: ${JSON.stringify(event)}`);

      await this.ticketEventService.publishTicketPurchased(event);

      this.logger.log(`Evento da compra do ticket enviado com sucesso`);
    } catch (error) {
      this.logger.error(`Erro ao enviar evento da compra do ticket: ${error.message}`);
    }



    return {
      transactionId: airticket.id
    };
  }
}

