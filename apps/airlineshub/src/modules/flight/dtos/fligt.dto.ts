import { AirlineEntity } from '@airlineshub/domains/entities/airline.entity';
import { AirplaneEntity } from '@airlineshub/domains/entities/airplane.entity';
import { AirportEntity } from '@airlineshub/domains/entities/airport.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FlightDto {
  @ApiProperty({
    description: 'Unique identifier for the flight',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Flight number',
    example: 123,
    required: false,
  })
  flightNumber?: number;

  @ApiProperty({
    description: 'Expected departure time',
    example: '2025-11-15T14:30:00Z',
  })
  expectedDeparture: Date;

  @ApiProperty({
    description: 'Expected arrival time',
    example: '2025-11-15T18:30:00Z',
  })
  expectedArrival: Date;

  @ApiProperty({
    description: 'Flight duration in minutes',
    example: 240,
  })
  duration: number;

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
    description: 'Current flight status',
    example: 'scheduled',
  })
  status: string;

  @ApiProperty({
    description: 'Airplane details',
  })
  airplane: ReturnType<AirplaneEntity['raw']>;

  @ApiProperty({
    description: 'Departure airport details',
    nullable: true,
  })
  departureAirport: ReturnType<AirportEntity['raw']> | null;

  @ApiProperty({
    description: 'Arrival airport details',
    nullable: true,
  })
  arrivalAirport: ReturnType<AirportEntity['raw']> | null;

  @ApiProperty({
    description: 'Operating airline details',
    nullable: true,
  })
  airline: ReturnType<AirlineEntity['raw']> | null;
}
