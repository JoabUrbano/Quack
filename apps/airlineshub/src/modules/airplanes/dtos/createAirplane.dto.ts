import { IsString, IsNumber } from 'class-validator';

export class CreateAirplaneDto {
  @IsString()
  model: string;

  @IsNumber()
  capacity: number;
}
