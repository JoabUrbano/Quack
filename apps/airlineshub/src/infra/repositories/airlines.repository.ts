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

    const airlines = await this.prismaService.airline.findMany({
      ...pagination,
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
