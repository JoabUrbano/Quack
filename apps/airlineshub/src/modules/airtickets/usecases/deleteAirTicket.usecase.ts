import { Injectable, NotFoundException } from '@nestjs/common';
import { AirTicketsRepository } from '@airlineshub/domains/repositories/airTickets.repository';

@Injectable()
export class DeleteAirTicketUseCase {
  constructor(private readonly airTicketsRepository: AirTicketsRepository) {}

  async execute(id: string) {
    const ticket = await this.airTicketsRepository.findOneById(id);

    if (!ticket) {
      throw new NotFoundException('Air ticket not found');
    }

    await this.airTicketsRepository.delete(id);

    return { message: 'Air ticket deleted successfully' };
  }
}
