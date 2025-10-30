import { AirplaneEntity } from '@airlineshub/domains/entities/airplane.entity';

export interface IPaginationFilter {
  page?: number;
  limit?: number;
}

export interface IFindManyFilter extends IPaginationFilter {
  ids?: string[];
}

export abstract class AirplanesRepository {
  abstract findMany(input: IFindManyFilter): Promise<AirplaneEntity[]>;

  abstract findOneById(id: string): Promise<AirplaneEntity | null>;
  
  abstract delete(id: string): Promise<void>;
  
  abstract save(airplane: AirplaneEntity): Promise<void>;
  
}
