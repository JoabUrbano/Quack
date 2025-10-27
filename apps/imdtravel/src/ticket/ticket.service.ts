import { Injectable } from '@nestjs/common';
import { BuyTicketDto } from '@imdtravel/ticket/dtos/buyTicket.dto';
import { AirlineHubGateway } from '@app/shared';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class TicketService {
  constructor(private airlineHubGateway: AirlineHubGateway) {}

buyTicket(input: BuyTicketDto): Observable<any> {
  const { flight, day } = input;

  return this.airlineHubGateway
    .getFlight(flight, day)
    .pipe(map((response: AxiosResponse) => response.data)); // ✅ pega só o body
}
}
