import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAirportDto {
  @ApiProperty({
    description: 'Name of the airport',
    example: 'Cristiano Ronaldo International Airport',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'City where the airport is located',
    example: 'Funchal',
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Country where the airport is located',
    example: 'Portugal',
  })
  @IsString()
  country: string;

  @ApiProperty({
    description: 'IATA code of the airport',
    example: 'FNC',
  })
  @IsString()
  iata: string;
}
