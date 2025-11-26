import { Global, Module } from '@nestjs/common';
import { UsersController } from '@airlineshub/modules/users/users.controller';
import { CreateUserUseCase } from '@airlineshub/modules/users/usecases/createUser.usecase';
import { UsersRepository } from '@airlineshub/domains/repositories/users.repository';
import { PrismaUsersRepository } from '@airlineshub/infra/repositories/users.repository';
import { PrismaService } from '@airlineshub/infra/database/prisma.service';
import { FindManyUsersUseCase } from '@airlineshub/modules/users/usecases/findManyUsers.usecase';
import { DeleteOneUserUseCase } from '@airlineshub/modules/users/usecases/deleteOneUser.usecase';
import { UpdateOneUserUseCase } from '@airlineshub/modules/users/usecases/updateOneUser.usecase';
import { FindOneUserByIdUseCase } from '@airlineshub/modules/users/usecases/findOneUserById.usecase';

@Global()
@Module({
  controllers: [UsersController],
  imports: [],
  providers: [
    PrismaService,
    CreateUserUseCase,
    FindManyUsersUseCase,
    FindOneUserByIdUseCase,
    DeleteOneUserUseCase,
    UpdateOneUserUseCase,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [UsersRepository, CreateUserUseCase],
})
export class UsersModule {}
