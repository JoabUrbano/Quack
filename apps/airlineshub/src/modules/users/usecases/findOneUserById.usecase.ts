import { UsersRepository } from '@airlineshub/domains/repositories/users.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindOneUserByIdUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.raw();
  }
}
