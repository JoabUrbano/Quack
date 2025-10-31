import { UserEntity } from '@airlineshub/domains/entities/user.entity';

export interface IPaginationFilter {
  page?: number;
  limit?: number;
}

export interface IFindManyFilter extends IPaginationFilter {
  ids?: string[];
}

export abstract class UsersRepository {
  abstract findMany(input: IFindManyFilter): Promise<UserEntity[]>;

  abstract findOneById(id: string): Promise<UserEntity | null>;

  abstract findOneByEmail(email: string): Promise<UserEntity | null>;

  abstract delete(id: string): Promise<void>;

  abstract save(user: UserEntity): Promise<void>;
}
