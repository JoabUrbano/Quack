import { Module } from '@nestjs/common';
import { AirportsController } from '@airlineshub/modules/airports/airports.controller';
import { CreateAirportUseCase } from '@airlineshub/modules/airports/usecases/createAirport.usecase';
import { AirportsRepository } from '@airlineshub/domains/repositories/airports.repository';
import { PrismaAirportsRepository } from '@airlineshub/infra/repositories/airports.repository';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';
import { FindManyAirportsUseCase } from '@airlineshub/modules/airports/usecases/findManyAirports.usecase';
import { FindOneAirportByIdUseCase } from '@airlineshub/modules/airports/usecases/findOneAirportById.usecase';
import { DeleteOneAirportUseCase } from '@airlineshub/modules/airports/usecases/deleteOneAirport.usecase';
import { UpdateOneAirportUseCase } from '@airlineshub/modules/airports/usecases/updateOneAirport.usecase';

@Module({
  controllers: [AirportsController],
  imports: [],
  providers: [
    PrismaService,
    CreateAirportUseCase,
    FindManyAirportsUseCase,
    FindOneAirportByIdUseCase,
    DeleteOneAirportUseCase,
    UpdateOneAirportUseCase,
    {
      provide: AirportsRepository,
      useClass: PrismaAirportsRepository,
    },
  ],
  exports: [AirportsRepository],
})
export class AirportsModule {}
