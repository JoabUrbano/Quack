import { Controller, Get } from '@nestjs/common';
import { AppService } from '@airlineshub/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }
}
