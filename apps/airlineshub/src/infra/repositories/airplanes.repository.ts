import { AirplaneEntity } from '@airlineshub/domains/entities/airplane.entity';
import {
  AirplanesRepository,
  IFindManyFilter,
} from '@airlineshub/domains/repositories/airplanes.repository';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';

@Injectable()
export class PrismaAirplanesRepository implements AirplanesRepository {
  constructor(private readonly prismaService: PrismaService) {}
  
  async findOneById(id: string): Promise<AirplaneEntity | null> {
    const airplane = await this.prismaService.airplane.findUnique({
      where: { id },
      select: {
        id: true,
        model: true,
        capacity: true,
      },
    });

    if (!airplane) {
      return null;
    }

    return new AirplaneEntity({
      id: airplane.id,
      model: airplane.model,
      capacity: airplane.capacity,
    });
  }
  
  async delete(id: string): Promise<void> {
    await this.prismaService.airplane.delete({
      where: { id },
    });
  }
  
  async save(airplane: AirplaneEntity): Promise<void> {
    await this.prismaService.airplane.upsert({
      where: { id: airplane.id },
      update: {
        model: airplane.model,
        capacity: airplane.capacity,
      },
      create: {
        id: airplane.id,
        model: airplane.model,
        capacity: airplane.capacity,
      },
    });
  }

  async findMany(input: IFindManyFilter): Promise<AirplaneEntity[]> {
    const { page, limit } = input;

    let pagination = {};

    if (page && limit) {
      pagination = {
        skip: (page - 1) * limit,
        take: limit,
      };
    }

    const airplanes = await this.prismaService.airplane.findMany({
      ...pagination,
      select: {
        id: true,
        model: true,
        capacity: true,
      },
    });

    return airplanes.map(
      (airplane) =>
        new AirplaneEntity({
          id: airplane.id,
          model: airplane.model,
          capacity: airplane.capacity,
        }),
    );
  }
}
