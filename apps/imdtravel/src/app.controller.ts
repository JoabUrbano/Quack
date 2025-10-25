import { Controller, Get } from '@nestjs/common';
import { AppService } from '@imdtravel/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
