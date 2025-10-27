import { Injectable } from "@nestjs/common";
import { GetFlightDto } from "../dtos/getFlight.dto";

@Injectable()
export class FindFlightByNumberUseCase {
  execute(params: GetFlightDto): any {
    const { flight, day } = params;
    return { flight, day, value: 1000 };
  }
}