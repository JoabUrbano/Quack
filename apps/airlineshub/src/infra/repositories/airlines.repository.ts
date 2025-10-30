import { AirlineEntity } from '@airlineshub/domains/entities/airline.entity';
import {
  AirlinesRepository,
  IFindManyFilter,
} from '@airlineshub/domains/repositories/airlines.repository';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';

@Injectable()
export class PrismaAirlinesRepository implements AirlinesRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findOneByName(name: string): Promise<AirlineEntity | null> {
    const airline = await this.prismaService.airline.findUnique({
      where: { name },
      select: {
        id: true,
        country: true,
        name: true,
      },
    });

    if (!airline) {
      return null;
    }

    return new AirlineEntity({
      id: airline.id,
      country: airline.country,
      name: airline.name,
    });
  }

  async findOneById(id: string): Promise<AirlineEntity | null> {
    const airline = await this.prismaService.airline.findUnique({
      where: { id },
      select: {
        id: true,
        country: true,
        name: true,
      },
    });

    if (!airline) {
      return null;
    }

    return new AirlineEntity({
      id: airline.id,
      country: airline.country,
      name: airline.name,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.airline.delete({
      where: { id },
    });
  }

  async save(airline: AirlineEntity): Promise<void> {
    await this.prismaService.airline.upsert({
      where: { id: airline.id },
      update: {
        country: airline.country,
        name: airline.name,
      },
      create: {
        id: airline.id,
        country: airline.country,
        name: airline.name,
      },
    });
  }

  async findMany(input: IFindManyFilter): Promise<AirlineEntity[]> {
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

    const airlines = await this.prismaService.airline.findMany({
      ...pagination,
      where: filter,
      select: {
        id: true,
        country: true,
        name: true,
      },
    });

    return airlines.map(
      (airline) =>
        new AirlineEntity({
          id: airline.id,
          country: airline.country,
          name: airline.name,
        }),
    );
  }
}
