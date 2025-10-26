import { Controller, Get } from '@nestjs/common';
import { FidelityService } from './fidelity.service';

@Controller()
export class FidelityController {
  constructor(private readonly fidelityService: FidelityService) {}

  @Get()
  getHello(): string {
    return this.fidelityService.getHello();
  }
}
