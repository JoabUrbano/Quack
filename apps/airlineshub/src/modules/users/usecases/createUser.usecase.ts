import { UsersRepository } from '@airlineshub/domains/repositories/users.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from '@airlineshub/domains/entities/user.entity';
import { UserCreatedEventDto } from '@app/shared/events';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) { }

  async execute(input: UserCreatedEventDto) {
    const userWithEmail = await this.usersRepository.findOneByEmail(
      input.email,
    );

    if (userWithEmail) {
      throw new ConflictException('Email already in use');
    }

    const user = UserEntity.create({
      id: input.userId,
      name: input.name,
      email: input.email,
    });

    await this.usersRepository.save(user);

    return user.raw();
  }
}
