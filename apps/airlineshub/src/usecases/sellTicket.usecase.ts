import { Injectable, NotFoundException } from '@nestjs/common';
import { SellTicketDto } from '@app/shared/dtos/sellTicket.dto';

import { AirTicketsRepository } from '@airlineshub/domains/repositories/airTickets.repository';
import { AirTicket } from '@airlineshub/domains/entities/airTicket.entity';
import { AirTicketDto } from '@app/shared/types/airTicket.dto';
import { FlightSchedulesRepository } from '@airlineshub/domains/repositories/flightSchedules.repository';
import { UsersRepository } from '@airlineshub/domains/repositories/users.repository';

@Injectable()
export class SellTicketUseCase {
  constructor(
    private readonly airTicketsRepository: AirTicketsRepository,
    private readonly flightSchedulesRepository: FlightSchedulesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(input: SellTicketDto): Promise<AirTicketDto> {
    const { userId, finalValue, flightScheduleId } = input;

    const flightSchedule =
      await this.flightSchedulesRepository.findById(flightScheduleId);

    if (!flightSchedule) {
      throw new NotFoundException('flightSchedule not found');
    }

    const user = await this.usersRepository.findOneById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const airTicket = AirTicket.create({
      userId: userId,
      flightScheduleId: flightSchedule.id,
      seatNumber: 2, // TODO: Pegar assento no params
      finalValue,
      purchaseDate: new Date(),
    });

    await this.airTicketsRepository.save(airTicket);

    return airTicket.raw();
  }
}
