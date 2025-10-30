import { AirlineEntity } from '@airlineshub/domains/entities/airline.entity';

export interface IPaginationFilter {
  page?: number;
  limit?: number;
}

export interface IFindManyFilter extends IPaginationFilter {
  ids?: string[];
}

export abstract class AirlinesRepository {
  abstract findMany(input: IFindManyFilter): Promise<AirlineEntity[]>;

  abstract findOneById(id: string): Promise<AirlineEntity | null>;

  abstract findOneByName(name: string): Promise<AirlineEntity | null>;
  
  abstract delete(id: string): Promise<void>;
  
  abstract save(airline: AirlineEntity): Promise<void>;
  
}

