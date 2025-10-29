import { IsString } from 'class-validator';

export class CreateAirportDto {
  @IsString()
  name: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  iata: string;
}
