import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString, IsUUID } from "class-validator";

export class TicketPurchasedEventDto {
  @IsString()
  transactionId: string;

  @IsUUID()
  userId: string;

  @IsNumber()
  flightNumber: number;

  @IsDate()
  @Type(() => Date)
  day: Date | string;

  @IsNumber()
  value: number;

  @IsDate()
  @Type(() => Date)
  timestamp: Date;
}

