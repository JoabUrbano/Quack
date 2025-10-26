import { AirlineEntity } from '@airlineshub/domains/entities/airline.entity';

export interface IPaginationFilter {
  page: number;
  limit: number;
}

export interface IFindManyFilter extends IPaginationFilter {}

export abstract class AirlinesRepository {
  abstract findMany(input: IFindManyFilter): Promise<AirlineEntity[]>;

  abstract findById(id: string): Promise<AirlineEntity | null>;

  abstract save(airline: AirlineEntity): Promise<void>;
}
