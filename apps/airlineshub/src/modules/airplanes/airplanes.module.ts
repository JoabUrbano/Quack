import { Module } from '@nestjs/common';
import { AirplanesController } from '@airlineshub/modules/airplanes/airplanes.controller';
import { CreateAirplaneUseCase } from '@airlineshub/modules/airplanes/usecases/createAirplane.usecase';
import { AirplanesRepository } from '@airlineshub/domains/repositories/airplanes.repository';
import { PrismaAirplanesRepository } from '@airlineshub/infra/repositories/airplanes.repository';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';
import { FindManyAirplanesUseCase } from '@airlineshub/modules/airplanes/usecases/findManyAirplanes.usecase';
import { DeleteOneAirplaneUseCase } from '@airlineshub/modules/airplanes/usecases/deleteOneAirplane.usecase';
import { UpdateOneAirplaneUseCase } from '@airlineshub/modules/airplanes/usecases/updateOneAirplane.usecase';
import { FindOneAirplaneByIdUseCase } from '@airlineshub/modules/airplanes/usecases/findOneAirplaneById.usecase';

@Module({
  controllers: [AirplanesController],
  imports: [],
  providers: [
    PrismaService,
    CreateAirplaneUseCase,
    FindManyAirplanesUseCase,
    FindOneAirplaneByIdUseCase,
    DeleteOneAirplaneUseCase,
    UpdateOneAirplaneUseCase,
    {
      provide: AirplanesRepository,
      useClass: PrismaAirplanesRepository,
    },
  ],
  exports: [AirplanesRepository],
})
export class AirplanesModule {}
