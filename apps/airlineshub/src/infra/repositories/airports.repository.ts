import { AirportEntity } from '@airlineshub/domains/entities/airport.entity';
import {
  AirportsRepository,
  IFindManyFilter,
} from '@airlineshub/domains/repositories/airports.repository';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';

@Injectable()
export class PrismaAirportsRepository implements AirportsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneById(id: string): Promise<AirportEntity | null> {
    const airport = await this.prismaService.aiport.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        city: true,
        country: true,
        iata: true,
      },
    });

    if (!airport) {
      return null;
    }

    return new AirportEntity({
      id: airport.id,
      name: airport.name,
      city: airport.city,
      country: airport.country,
      iata: airport.iata,
    });
  }

  async findOneByIata(iata: string): Promise<AirportEntity | null> {
    const airport = await this.prismaService.aiport.findUnique({
      where: { iata },
      select: {
        id: true,
        name: true,
        city: true,
        country: true,
        iata: true,
      },
    });

    if (!airport) {
      return null;
    }

    return new AirportEntity({
      id: airport.id,
      name: airport.name,
      city: airport.city,
      country: airport.country,
      iata: airport.iata,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.aiport.delete({
      where: { id },
    });
  }

  async save(airport: AirportEntity): Promise<void> {
    await this.prismaService.aiport.upsert({
      where: { id: airport.id },
      update: {
        name: airport.name,
        city: airport.city,
        country: airport.country,
        iata: airport.iata,
      },
      create: {
        id: airport.id,
        name: airport.name,
        city: airport.city,
        country: airport.country,
        iata: airport.iata,
      },
    });
  }

  async findMany(input: IFindManyFilter): Promise<AirportEntity[]> {
    const { page, limit } = input;

    let pagination = {};

    if (page && limit) {
      pagination = {
        skip: (page - 1) * limit,
        take: limit,
      };
    }

    const airports = await this.prismaService.aiport.findMany({
      ...pagination,
      select: {
        id: true,
        name: true,
        city: true,
        country: true,
        iata: true,
      },
    });

    return airports.map(
      (airport) =>
        new AirportEntity({
          id: airport.id,
          name: airport.name,
          city: airport.city,
          country: airport.country,
          iata: airport.iata,
        }),
    );
  }
}
