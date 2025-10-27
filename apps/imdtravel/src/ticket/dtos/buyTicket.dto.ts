import { Type } from 'class-transformer';
import { IsDate, IsInt } from 'class-validator';

export class BuyTicketDto {
  @IsInt()
  flight: number;

  @IsDate()
  @Type(() => Date)
  day: Date;

  @IsInt()
  userId: number;
}
