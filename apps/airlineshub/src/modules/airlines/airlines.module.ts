import { Module } from '@nestjs/common';
import { AirlinesController } from '@airlineshub/modules/airlines/airlines.controller';
import { CreateAirlineUseCase } from '@airlineshub/modules/airlines/usecases/creteAirline.usecase';
import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';
import { PrismaAirlinesRepository } from '@airlineshub/infra/repositories/airlines.repository';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';
import { FindManydAirlinesUseCase } from '@airlineshub/modules/flight/usecases/findManyAirlines.usecase';

@Module({
  controllers: [AirlinesController],
  providers: [
    PrismaService,
    CreateAirlineUseCase,
    FindManydAirlinesUseCase,
    {
      provide: AirlinesRepository,
      useClass: PrismaAirlinesRepository,
    },
  ],
})
export class AirlinesModule {}
