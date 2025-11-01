import { Injectable, NotFoundException } from '@nestjs/common';
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

    const flightSchedule = flight.flightSchedules.find((schedule) => {
      const scheduleDate = new Date(schedule.expectedDeparture);
      return (
        scheduleDate.getFullYear() === day.getFullYear() &&
        scheduleDate.getMonth() === day.getMonth() &&
        scheduleDate.getDate() === day.getDate()
      );
    });

    if (!flightSchedule) {
      throw new NotFoundException(
        'Flight schedule not found for the given day',
      );
    }

    const conversionRate = await this.exchangeGateway.conversionRate();

    const airticket = await this.airlineHubGateway.sellTicket({
      flightScheduleId: flightSchedule.id,
      finalValue: flightSchedule.value,
      userId: input.userId,
    });

    const valueInDolar = Math.round(flightSchedule.value / conversionRate);

    return {
      flight,
      airticket,
      valueInDolar,
    };
  }
}
