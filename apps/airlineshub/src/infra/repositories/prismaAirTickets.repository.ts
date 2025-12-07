import { AirTicket } from '@airlineshub/domains/entities/airTicket.entity';
import {
  AirTicketsRepository,
  IFindManyFilter,
} from '@airlineshub/domains/repositories/airTickets.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';

@Injectable()
export class PrismaAirTicketsRepository extends AirTicketsRepository {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async save(airTicket: AirTicket): Promise<void> {
    try {
      await this.prismaService.airTicket.upsert({
        where: { id: airTicket.id },
        update: {
          purchaseDate: airTicket.purchaseDate,
          flightId: airTicket.flightId,
          finalValue: airTicket.finalValue,
          userId: airTicket.userId,
          seatNumber: airTicket.seatNumber,
        },
        create: {
          id: airTicket.id,
          seatNumber: airTicket.seatNumber,
          purchaseDate: airTicket.purchaseDate,
          flightId: airTicket.flightId,
          finalValue: airTicket.finalValue,
          userId: airTicket.userId,
        },
      });
    } catch (error) {
      console.log('Error ao salvar ticket: ', error);
      
      console.log('parametros de entrada: ', airTicket);

      const msgError = error?.message || 'Desconhecido';
      
      throw new Error('Ocorreu um erro ao salvar o ticket: ', msgError)
    }


  }

  async findMany(input: IFindManyFilter): Promise<AirTicket[]> {
    const page = input.page || 1;
    const limit = input.limit || 10;
    const skip = (page - 1) * limit;

    const tickets = await this.prismaService.airTicket.findMany({
      where: {
        ...(input.flightId && { flightId: input.flightId }),
        ...(input.userId && { userId: input.userId }),
      },
      skip,
      take: limit,
      select: {
        id: true,
        seatNumber: true,
        flightId: true,
        userId: true,
        finalValue: true,
        purchaseDate: true,
      },
    });

    return tickets.map(
      (ticket) =>
        new AirTicket({
          id: ticket.id,
          seatNumber: ticket.seatNumber,
          flightId: ticket.flightId,
          userId: ticket.userId,
          finalValue: ticket.finalValue,
          purchaseDate: ticket.purchaseDate,
        }),
    );
  }

  async findOneById(id: string): Promise<AirTicket | null> {
    const ticket = await this.prismaService.airTicket.findUnique({
      where: { id },
      select: {
        id: true,
        seatNumber: true,
        flightId: true,
        userId: true,
        finalValue: true,
        purchaseDate: true,
      },
    });

    if (!ticket) {
      return null;
    }

    return new AirTicket({
      id: ticket.id,
      seatNumber: ticket.seatNumber,
      flightId: ticket.flightId,
      userId: ticket.userId,
      finalValue: ticket.finalValue,
      purchaseDate: ticket.purchaseDate,
    });
  }

  async findOneByFlightAndSeat(
    flightId: string,
    seatNumber: number,
  ): Promise<AirTicket | null> {
    const ticket = await this.prismaService.airTicket.findFirst({
      where: {
        flightId,
        seatNumber,
      },
      select: {
        id: true,
        seatNumber: true,
        flightId: true,
        userId: true,
        finalValue: true,
        purchaseDate: true,
      },
    });

    if (!ticket) {
      return null;
    }

    return new AirTicket({
      id: ticket.id,
      seatNumber: ticket.seatNumber,
      flightId: ticket.flightId,
      userId: ticket.userId,
      finalValue: ticket.finalValue,
      purchaseDate: ticket.purchaseDate,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.airTicket.delete({
      where: { id },
    });
  }

  async update(id: string, airTicket: AirTicket): Promise<void> {
    await this.prismaService.airTicket.update({
      where: { id },
      data: {
        seatNumber: airTicket.seatNumber,
        finalValue: airTicket.finalValue,
        purchaseDate: airTicket.purchaseDate,
      },
    });
  }
}
