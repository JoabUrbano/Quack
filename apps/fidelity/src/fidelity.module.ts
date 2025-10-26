import { Module } from '@nestjs/common';
import { FidelityController } from './fidelity.controller';
import { FidelityService } from './fidelity.service';

@Module({
  imports: [],
  controllers: [FidelityController],
  providers: [FidelityService],
})
export class FidelityModule {}
