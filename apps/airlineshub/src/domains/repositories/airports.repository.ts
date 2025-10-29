import { AirportEntity } from '@airlineshub/domains/entities/airport.entity';

export interface IPaginationFilter {
  page: number;
  limit: number;
}

export interface IFindManyFilter extends IPaginationFilter {}

export abstract class AirportsRepository {
  abstract findMany(input: IFindManyFilter): Promise<AirportEntity[]>;

  abstract findOneById(id: string): Promise<AirportEntity | null>;

  abstract findOneByIata(iata: string): Promise<AirportEntity | null>;
  
  abstract delete(id: string): Promise<void>;
  
  abstract save(airport: AirportEntity): Promise<void>;
}
