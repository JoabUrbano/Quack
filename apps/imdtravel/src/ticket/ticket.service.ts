import { Injectable } from '@nestjs/common';
import { BuyTicketDto } from '@imdtravel/ticket/dtos/buyTicket.dto';
import { AirlineHubGateway } from '@app/shared';

@Injectable()
export class TicketService {
  constructor(private airlineHubGateway: AirlineHubGateway) {}

  async buyTicket(input: BuyTicketDto): Promise<any> {
    const { flight, day } = input;

    const res = await this.airlineHubGateway.getFlight(flight, day);
    return res;
  }
}
