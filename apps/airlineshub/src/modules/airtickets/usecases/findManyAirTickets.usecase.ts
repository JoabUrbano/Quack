import { Injectable } from '@nestjs/common';
import { AirTicketsRepository } from '@airlineshub/domains/repositories/airTickets.repository';
import { FindManyAirTicketsDto } from '@airlineshub/modules/airtickets/dtos/findManyAirTickets.dto';

@Injectable()
export class FindManyAirTicketsUseCase {
  constructor(private readonly airTicketsRepository: AirTicketsRepository) {}

  async execute(input: FindManyAirTicketsDto) {
    const tickets = await this.airTicketsRepository.findMany({
      page: input.page || 1,
      limit: input.limit || 10,
    });

    return tickets.map((ticket) => ticket.raw());
  }
}
