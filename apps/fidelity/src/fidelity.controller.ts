import { Public } from '@app/shared/decorators';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class FidelityController {

  @Public()
  @Get()
  getHello(): string {
    return "Hello";
  }
}
