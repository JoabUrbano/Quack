import { Injectable } from "@nestjs/common";

@Injectable()
export class FindFlightByIdUseCase {
  execute(flightId: number, day: Date) {
    return { flightId: flightId, day: day, value: 1000 };
  }
}
