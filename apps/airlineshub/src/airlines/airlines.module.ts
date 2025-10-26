import { Module } from '@nestjs/common';
import { AirlinesController } from '@airlineshub/airlines/airlines.controller';
import { CreateAirlineUseCase } from '@airlineshub/usecases/creteAirline.usecase';
import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';
import { PrismaAirlinesRepository } from '@airlineshub/infra/repositories/airlines.repository';
import { PrismaService } from '@airlineshub/prisma.service';
import { FindManydAirlinesUseCase } from '@airlineshub/usecases/findManyAirlines.usecase';

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
