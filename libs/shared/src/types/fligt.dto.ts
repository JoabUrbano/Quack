import { ApiProperty } from '@nestjs/swagger';

export class AirplaneDto {
  @ApiProperty({
    description: 'Unique identifier for the airplane',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Model of the airplane',
    example: 'Boeing 737',
  })
  model: string;

  @ApiProperty({
    description: 'Passenger capacity of the airplane',
    example: 180,
  })
  capacity: number;
}

export class AirportDto {
  @ApiProperty({
    description: 'Unique identifier for the airport',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the airport',
    example: 'Example Airport',
  })
  name: string;

  @ApiProperty({
    description: 'City where the airport is located',
    example: 'Example City',
  })
  city: string;

  @ApiProperty({
    description: 'Country where the airport is located',
    example: 'Example Country',
  })
  country: string;
  iata: string;
}

export class AirlineDto {
  @ApiProperty({
    description: 'Unique identifier for the airline',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the airline',
    example: 'Example Airline',
  })
  name: string;

  @ApiProperty({
    description: 'Country of the airline',
    example: 'Brazil',
  })
  country: string;
}

export class FlightDto {
  @ApiProperty({
    description: 'Unique identifier for the flight',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Airplane details',
  })
  airplane: AirplaneDto;

  @ApiProperty({
    description: 'Flight number',
    example: 123,
    required: false,
  })
  flightNumber?: number;

  @ApiProperty({
    description: 'Flight duration in minutes',
    example: 240,
  })
  duration: number;

  @ApiProperty({
    description: 'Departure airport details',
    nullable: true,
  })
  departureAirport: AirportDto | null;

  @ApiProperty({
    description: 'Arrival airport details',
    nullable: true,
  })
  arrivalAirport: AirportDto | null;

  @ApiProperty({
    description: 'Terminal identifier',
    example: '1',
  })
  terminal: string;

  @ApiProperty({
    description: 'Gate identifier',
    example: 'A12',
  })
  gate: string;

  @ApiProperty({
    description: 'Operating airline details',
    nullable: true,
  })
  airline: AirlineDto | null;
}
