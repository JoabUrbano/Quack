import { Module } from '@nestjs/common';
import { FidelityController } from '@fidelity/fidelity.controller';
import { BonusModule } from '@fidelity/modules/bonus/bonus.module';
import { PrismaService } from '@fidelity/infra/database/prisma.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { SharedModule } from '@app/shared';
import { RabbitMQModule as FidelityRabbitMQModule } from '@fidelity/modules/rabbitmq/rabbitmq.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/shared/guards';

@Module({
  imports: [
    FidelityRabbitMQModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        FIDELITY_DATABASE_URL: Joi.string().uri().required(),
        RABBITMQ_URL: Joi.string(),
      }),

    }),
    BonusModule,
    SharedModule
  ],
  controllers: [FidelityController],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard
  }, PrismaService],
})
export class FidelityModule { }
