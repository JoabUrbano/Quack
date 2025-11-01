import { Module } from '@nestjs/common';
import { FidelityController } from '@fidelity/fidelity.controller';
import { BonusModule } from '@fidelity/modules/bonus/bonus.module';
import { PrismaService } from '@fidelity/infra/database/prisma.service';

@Module({
  imports: [BonusModule],
  controllers: [FidelityController],
  providers: [PrismaService],
})
export class FidelityModule {}
