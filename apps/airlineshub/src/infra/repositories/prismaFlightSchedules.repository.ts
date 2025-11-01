import { FlightScheduleEntity } from '@airlineshub/domains/entities/flightSchedule.entity';
import {
  FlightSchedulesRepository,
  IFindManyFilter,
} from '@airlineshub/domains/repositories/flightSchedules.repository';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';

@Injectable()
export class PrismaFlightSchedulesRepository
  implements FlightSchedulesRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async save(
    flightSchedule: FlightScheduleEntity,
  ): Promise<FlightScheduleEntity> {
    const savedFlightSchedule = await this.prismaService.flightSchedule.upsert({
      where: { id: flightSchedule.id },
      update: {
        flightId: flightSchedule.flightId,
        expectedDeparture: flightSchedule.expectedDeparture,
        expectedArrival: flightSchedule.expectedArrival,
        value: flightSchedule.value,
        status: flightSchedule.status.value as any,
      },
      create: {
        id: flightSchedule.id,
        flightId: flightSchedule.flightId,
        expectedDeparture: flightSchedule.expectedDeparture,
        expectedArrival: flightSchedule.expectedArrival,
        value: flightSchedule.value,
        status: flightSchedule.status.value as any,
      },
    });

    return new FlightScheduleEntity({
      id: savedFlightSchedule.id,
      flightId: savedFlightSchedule.flightId,
      expectedDeparture: savedFlightSchedule.expectedDeparture,
      expectedArrival: savedFlightSchedule.expectedArrival,
      value: savedFlightSchedule.value,
      status: savedFlightSchedule.status as any,
    });
  }

  async findMany(input: IFindManyFilter): Promise<FlightScheduleEntity[]> {
    const { page, limit, ids, flightIds } = input;

    let pagination = {};
    let where = {};

    if (page && limit) {
      pagination = {
        skip: (page - 1) * limit,
        take: limit,
      };
    }

    if (ids && ids.length > 0) {
      where = { id: { in: ids } };
    }

    if (flightIds) {
      where = { flightIds: { in: flightIds } };
    }

    console.log('where => ', where);

    const flightSchedules = await this.prismaService.flightSchedule.findMany({
      ...pagination,
      where,
      select: {
        id: true,
        flightId: true,
        expectedDeparture: true,
        expectedArrival: true,
        value: true,
        status: true,
      },
    });

    return flightSchedules.map(
      (flightSchedule) =>
        new FlightScheduleEntity({
          id: flightSchedule.id,
          flightId: flightSchedule.flightId,
          expectedDeparture: flightSchedule.expectedDeparture,
          expectedArrival: flightSchedule.expectedArrival,
          value: flightSchedule.value,
          status: flightSchedule.status as any,
        }),
    );
  }

  async findById(id: string): Promise<FlightScheduleEntity | null> {
    const flightSchedule = await this.prismaService.flightSchedule.findUnique({
      where: { id },
      select: {
        id: true,
        flightId: true,
        expectedDeparture: true,
        expectedArrival: true,
        value: true,
        status: true,
      },
    });

    if (!flightSchedule) {
      return null;
    }

    return new FlightScheduleEntity({
      id: flightSchedule.id,
      flightId: flightSchedule.flightId,
      expectedDeparture: flightSchedule.expectedDeparture,
      expectedArrival: flightSchedule.expectedArrival,
      value: flightSchedule.value,
      status: flightSchedule.status as any,
    });
  }

  async findByFlightId(flightId: string): Promise<FlightScheduleEntity[]> {
    const flightSchedules = await this.prismaService.flightSchedule.findMany({
      where: { flightId },
      select: {
        id: true,
        flightId: true,
        expectedDeparture: true,
        expectedArrival: true,
        value: true,
        status: true,
      },
    });

    return flightSchedules.map(
      (flightSchedule) =>
        new FlightScheduleEntity({
          id: flightSchedule.id,
          flightId: flightSchedule.flightId,
          expectedDeparture: flightSchedule.expectedDeparture,
          expectedArrival: flightSchedule.expectedArrival,
          value: flightSchedule.value,
          status: flightSchedule.status as any,
        }),
    );
  }
}
