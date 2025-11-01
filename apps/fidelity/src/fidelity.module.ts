import { Module } from '@nestjs/common';
import { FidelityController } from '@fidelity/fidelity.controller';
import { BonusModule } from '@fidelity/modules/bonus/bonus.module';
import { PrismaService } from '@fidelity/infra/database/prisma.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        FIDELITY_DATABASE_URL: Joi.string().uri().required(),
      }),
    }),
    BonusModule,
  ],
  controllers: [FidelityController],
  providers: [PrismaService],
})
export class FidelityModule {}
