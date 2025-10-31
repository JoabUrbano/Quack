import { Module } from '@nestjs/common';
import { AirTicketsController } from '@airlineshub/modules/airtickets/airtickets.controller';
import { CreateAirTicketUseCase } from '@airlineshub/modules/airtickets/usecases/createAirTicket.usecase';
import { FindManyAirTicketsUseCase } from '@airlineshub/modules/airtickets/usecases/findManyAirTickets.usecase';
import { FindOneAirTicketByIdUseCase } from '@airlineshub/modules/airtickets/usecases/findOneAirTicketById.usecase';
import { DeleteAirTicketUseCase } from '@airlineshub/modules/airtickets/usecases/deleteAirTicket.usecase';
import { UpdateAirTicketUseCase } from '@airlineshub/modules/airtickets/usecases/updateAirTicket.usecase';
import { AirTicketsRepository } from '@airlineshub/domains/repositories/airTickets.repository';
import { PrismaAirTicketsRepository } from '@airlineshub/infra/repositories/prismaAirTickets.repository';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';

@Module({
  controllers: [AirTicketsController],
  providers: [
    PrismaService,
    CreateAirTicketUseCase,
    FindManyAirTicketsUseCase,
    FindOneAirTicketByIdUseCase,
    DeleteAirTicketUseCase,
    UpdateAirTicketUseCase,
    {
      provide: AirTicketsRepository,
      useClass: PrismaAirTicketsRepository,
    },
  ],
  exports: [AirTicketsRepository],
})
export class AirTicketsModule {}
