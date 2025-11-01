import { Controller, Get } from '@nestjs/common';

@Controller()
export class FidelityController {

  @Get()
  getHello(): string {
    return "Hello";
  }
}
