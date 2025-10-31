import { UsersRepository } from '@airlineshub/domains/repositories/users.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateOneUserDto } from '@airlineshub/modules/users/dtos/updateOneUser.dto';

@Injectable()
export class UpdateOneUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string, inputUser: UpdateOneUserDto) {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (inputUser.name) {
      user.name = inputUser.name;
    }

    if (inputUser.email) {
      user.email = inputUser.email;
    }

    if (inputUser.password) {
      user.password = inputUser.password;
    }

    await this.usersRepository.save(user);

    return user.raw();
  }
}
