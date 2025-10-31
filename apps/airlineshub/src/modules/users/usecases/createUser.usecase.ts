import { UsersRepository } from '@airlineshub/domains/repositories/users.repository';
import { CreateUserDto } from '@airlineshub/modules/users/dtos/createUser.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from '@airlineshub/domains/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(input: CreateUserDto) {
    const userWithEmail = await this.usersRepository.findOneByEmail(
      input.email,
    );

    if (userWithEmail) {
      throw new ConflictException('Email already in use');
    }

    const user = UserEntity.create({
      name: input.name,
      email: input.email,
      password: input.password,
    });

    await this.usersRepository.save(user);

    return user.raw();
  }
}
