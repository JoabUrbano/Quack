import { IsString } from 'class-validator';

export class CreateAirlineDto {
  @IsString()
  name: string;

  @IsString()
  country: string;
}
