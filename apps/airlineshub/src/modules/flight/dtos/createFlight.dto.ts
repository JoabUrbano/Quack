import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFlightDto {
  @IsDate()
  @Type(() => Date)
  expectedDeparture: Date;

  @IsDate()
  @Type(() => Date)
  expectedArrival: Date;

  @IsNumber()
  duration: number;

  @IsString()
  terminal: string;

  @IsString()
  gate: string;

  @IsString()
  airlineId: string;

  @IsOptional()
  @IsString()
  status?: string;
}
