import { FlightScheduleEntity } from '@airlineshub/domains/entities/flightSchedule.entity';

export interface IPaginationFilter {
  page?: number;
  limit?: number;
}

export interface IFindManyFilter extends IPaginationFilter {
  ids?: string[];
  flightId?: string;
}

export abstract class FlightSchedulesRepository {
  abstract findMany(input: IFindManyFilter): Promise<FlightScheduleEntity[]>;

  abstract save(
    flightSchedule: FlightScheduleEntity,
  ): Promise<FlightScheduleEntity>;

  abstract findById(id: string): Promise<FlightScheduleEntity | null>;

  abstract findByFlightId(flightId: string): Promise<FlightScheduleEntity[]>;
}
