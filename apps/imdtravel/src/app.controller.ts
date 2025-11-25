import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from '@imdtravel/app.service';
import { AuthGuard } from '@app/shared/guards';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseGuards(AuthGuard)
  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
