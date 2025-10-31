import { Injectable, NotFoundException } from '@nestjs/common';
import { AirTicketsRepository } from '@airlineshub/domains/repositories/airTickets.repository';
import { UpdateAirTicketDto } from '@airlineshub/modules/airtickets/dtos/updateAirTicket.dto';
import { AirTicket } from '@airlineshub/domains/entities/airTicket.entity';

@Injectable()
export class UpdateAirTicketUseCase {
  constructor(private readonly airTicketsRepository: AirTicketsRepository) {}

  async execute(id: string, input: UpdateAirTicketDto) {
    const existingTicket = await this.airTicketsRepository.findOneById(id);

    if (!existingTicket) {
      throw new NotFoundException('Air ticket not found');
    }

    const updatedTicket = new AirTicket({
      id: existingTicket.id,
      seatNumber: input.seatNumber ?? existingTicket.seatNumber,
      flightId: existingTicket.flightId,
      userId: existingTicket.userId,
      finalValue: input.finalValue ?? existingTicket.finalValue,
      purchaseDate: existingTicket.purchaseDate,
    });

    await this.airTicketsRepository.update(id, updatedTicket);

    return updatedTicket.raw();
  }
}
