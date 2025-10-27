import { AirlineHubGateway } from '@app/shared/airlineshub.gateway';
import { Injectable } from '@nestjs/common';
  
@Injectable()
export class AppService {
  constructor(private readonly airlineHubGateway: AirlineHubGateway) {}

  async getHello(): Promise<string> {
    return this.airlineHubGateway.getHello();
  }
}
