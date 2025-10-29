import { Module } from '@nestjs/common';
import { AirlinesController } from '@airlineshub/modules/airlines/airlines.controller';
import { CreateAirlineUseCase } from '@airlineshub/modules/airlines/usecases/createAirline.usecase';
import { AirlinesRepository } from '@airlineshub/domains/repositories/airlines.repository';
import { PrismaAirlinesRepository } from '@airlineshub/infra/repositories/airlines.repository';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';
import { FindManydAirlinesUseCase } from '@airlineshub/modules/airlines/usecases/findManyAirlines.usecase';
import { FindOneAirlineByIdUseCase } from '@airlineshub/modules/airlines/usecases/findOneAirlineById.usecase';
import { DeleteOneAirlineUseCase } from '@airlineshub/modules/airlines/usecases/deleteOneAirline.usecase';
import { UpdateOneAirlineUseCase } from '@airlineshub/modules/airlines/usecases/updateOneAirline.usecase';
import { FlightModule } from '@airlineshub/modules/flight/flight.module';

@Module({
  controllers: [AirlinesController],
  imports: [
    FlightModule,
  ],
  providers: [
    PrismaService,
    CreateAirlineUseCase,
    FindManydAirlinesUseCase,
    FindOneAirlineByIdUseCase,
    DeleteOneAirlineUseCase,
    UpdateOneAirlineUseCase,
    {
      provide: AirlinesRepository,
      useClass: PrismaAirlinesRepository,
    },
  ],
})
export class AirlinesModule {}
