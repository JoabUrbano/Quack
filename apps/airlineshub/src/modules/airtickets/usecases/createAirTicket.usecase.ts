import { Injectable, ConflictException } from '@nestjs/common';
import { AirTicketsRepository } from '@airlineshub/domains/repositories/airTickets.repository';
import { CreateAirTicketDto } from '@airlineshub/modules/airtickets/dtos/createAirTicket.dto';
import { AirTicket } from '@airlineshub/domains/entities/airTicket.entity';

@Injectable()
export class CreateAirTicketUseCase {
  constructor(private readonly airTicketsRepository: AirTicketsRepository) {}

  async execute(input: CreateAirTicketDto) {
    const existingTicket =
      await this.airTicketsRepository.findOneByFlightScheduleAndSeat(
        input.flightScheduleId,
        input.seatNumber,
      );

    if (existingTicket) {
      throw new ConflictException(
        'Ticket for this flight and seat already exists',
      );
    }

    const airTicket = AirTicket.create({
      seatNumber: input.seatNumber,
      flightScheduleId: input.flightScheduleId,
      userId: input.userId,
      finalValue: input.finalValue,
      purchaseDate: new Date(),
    });

    await this.airTicketsRepository.save(airTicket);

    return airTicket.raw();
  }
}
