import { SharedService } from '@app/shared/shared.service';
import { Injectable } from '@nestjs/common';
  
@Injectable()
export class AppService {
  constructor(private readonly sharedService: SharedService) {}

  async getHello(): Promise<string> {
    return this.sharedService.getHello();
  }
}
