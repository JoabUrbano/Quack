import { UsersRepository } from '@airlineshub/domains/repositories/users.repository';
import { Injectable } from '@nestjs/common';
import { FindManyUsersDto } from '@airlineshub/modules/users/dtos/findManyUsers.dto';

@Injectable()
export class FindManyUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(input: FindManyUsersDto) {
    const { limit, page } = input;

    const users = await this.usersRepository.findMany({ page, limit });

    return users.map((user) => user.raw());
  }
}
