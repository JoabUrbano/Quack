import { UsersRepository } from '@airlineshub/domains/repositories/users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteOneUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string) {
    await this.usersRepository.delete(id);
    return `User with #${id} was deleted`;
  }
}
