import {
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFlightDto {
  @IsUUID()
  airplaneId: string;

  @IsDate()
  @Type(() => Date)
  expectedDeparture: Date;

  @IsDate()
  @Type(() => Date)
  expectedArrival: Date;

  @IsNumber()
  duration: number;

  @IsUUID()
  departureAirportId: string;

  @IsUUID()
  arrivalAirportId: string;

  @IsString()
  terminal: string;

  @IsString()
  gate: string;

  @IsUUID()
  airlineId: string;

  @IsOptional()
  @IsString()
  status?: string;
}
