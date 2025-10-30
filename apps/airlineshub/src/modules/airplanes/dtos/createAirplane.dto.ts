import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAirplaneDto {
  @ApiProperty({
    description: 'Model of the airplane',
    example: 'Boeing 737',
  })
  @IsString()
  model: string;

  @ApiProperty({
    description: 'Passenger capacity of the airplane',
    example: 189,
  })
  @IsNumber()
  capacity: number;
}
