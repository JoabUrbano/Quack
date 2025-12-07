import { Injectable, NotFoundException } from '@nestjs/common';
import { SellTicketDto } from '@app/shared/dtos/sellTicket.dto';

import { AirTicketsRepository } from '@airlineshub/domains/repositories/airTickets.repository';
import { FlightsRepository } from '@airlineshub/domains/repositories/flights.repository';
import { AirTicket } from '@airlineshub/domains/entities/airTicket.entity';
import { AirTicketDto } from '@app/shared/types/airTicket.dto';

@Injectable()
export class SellTicketUseCase {
  constructor(
    private readonly airTicketsRepository: AirTicketsRepository,
    private readonly flightsRepository: FlightsRepository,
  ) { }

  async execute(input: SellTicketDto): Promise<AirTicketDto> {
    const { userId, day, flight: flightNumber, finalValue } = input;

    const flight =
      await this.flightsRepository.findByFlightNumber(flightNumber);

    if (!flight) {
      throw new NotFoundException('Flight not found');
    }

    // TODO: Buscar cliente pelo email
    if (!userId) {
      throw new NotFoundException('User not found');
    }

    const airTicket = AirTicket.create({
      userId: userId,
      flightId: flight.id,
      seatNumber: 2, // TODO: Pegar assento no params
      finalValue,
      purchaseDate: new Date(),
    });


    await this.airTicketsRepository.save(airTicket);

    return airTicket.raw();
  }
}
