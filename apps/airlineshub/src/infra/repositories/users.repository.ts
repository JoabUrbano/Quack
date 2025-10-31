import { UserEntity } from '@airlineshub/domains/entities/user.entity';
import {
  UsersRepository,
  IFindManyFilter,
} from '@airlineshub/domains/repositories/users.repository';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneById(id: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      return null;
    }

    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      return null;
    }

    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: { id },
    });
  }

  async save(user: UserEntity): Promise<void> {
    await this.prismaService.user.upsert({
      where: { id: user.id },
      update: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  async findMany(input: IFindManyFilter): Promise<UserEntity[]> {
    const { page, limit } = input;

    let pagination = {};

    if (page && limit) {
      pagination = {
        skip: (page - 1) * limit,
        take: limit,
      };
    }

    let filter = {};

    if (input.ids && input.ids.length > 0) {
      filter = {
        ...filter,
        id: { in: input.ids },
      };
    }

    const users = await this.prismaService.user.findMany({
      ...pagination,
      where: filter,
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    return users.map(
      (user) =>
        new UserEntity({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        }),
    );
  }
}
