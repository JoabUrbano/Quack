import { IsString, IsUUID } from 'class-validator';

export class CreateAirlineDto {
  @IsString()
  name: string;

  @IsString()
  country: string;
}
