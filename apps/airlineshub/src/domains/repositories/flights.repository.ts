import { FlightEntity } from '@airlineshub/domains/entities/flight.entity';

export interface IPaginationFilter {
  page?: number;
  limit?: number;
}

export interface IFindManyFilter extends IPaginationFilter {
  ids?: string[];
}

export abstract class FlightsRepository {
  abstract findMany(input: IFindManyFilter): Promise<FlightEntity[]>;

  abstract save(flight: FlightEntity): Promise<FlightEntity>;

  abstract findByFlightNumber(number: number): Promise<FlightEntity | null>;
}
