import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from '@imdtravel/app.service';
import { Public } from '@app/shared/decorators';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Public()
  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
