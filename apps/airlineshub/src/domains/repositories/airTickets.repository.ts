import { AirTicket } from '@airlineshub/domains/entities/airTicket.entity';

export interface IPaginationFilter {
  page?: number;
  limit?: number;
}

export interface IFindManyFilter extends IPaginationFilter {
  flightId?: string;
  userId?: string;
}

export abstract class AirTicketsRepository {
  abstract save(airTicket: AirTicket): Promise<void>;

  abstract findMany(input: IFindManyFilter): Promise<AirTicket[]>;

  abstract findOneById(id: string): Promise<AirTicket | null>;

  abstract findOneByFlightAndSeat(flightId: string, seatNumber: number): Promise<AirTicket | null>;

  abstract delete(id: string): Promise<void>;

  abstract update(id: string, airTicket: AirTicket): Promise<void>;
}
