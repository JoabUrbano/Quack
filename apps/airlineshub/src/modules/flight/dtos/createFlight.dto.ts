import {
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// export class CreateFlightDto {
//   @ApiProperty({
//     description: 'UUID of the airplane',
//     example: '550e8400-e29b-41d4-a716-446655440000',
//   })
//   @IsUUID()
//   airplaneId: string;

//   @ApiProperty({
//     description: 'Flight value in cents',
//     example: 150000,
//   })
//   @IsNumber()
//   value: number;

//   @ApiProperty({
//     description: 'Expected departure date and time',
//     example: '2025-11-15T14:30:00Z',
//   })
//   @IsDate()
//   @Type(() => Date)
//   expectedDeparture: Date;

//   @ApiProperty({
//     description: 'Expected arrival date and time',
//     example: '2025-11-15T18:30:00Z',
//   })
//   @IsDate()
//   @Type(() => Date)
//   expectedArrival: Date;

//   @ApiProperty({
//     description: 'Flight duration in minutes',
//     example: 240,
//   })
//   @IsNumber()
//   duration: number;

//   @ApiProperty({
//     description: 'UUID of the departure airport',
//     example: '550e8400-e29b-41d4-a716-446655440001',
//   })
//   @IsUUID()
//   departureAirportId: string;

//   @ApiProperty({
//     description: 'UUID of the arrival airport',
//     example: '550e8400-e29b-41d4-a716-446655440002',
//   })
//   @IsUUID()
//   arrivalAirportId: string;

//   @ApiProperty({
//     description: 'Terminal number or identifier',
//     example: '1',
//   })
//   @IsString()
//   terminal: string;

//   @ApiProperty({
//     description: 'Gate number or identifier',
//     example: 'A12',
//   })
//   @IsString()
//   gate: string;

//   @ApiProperty({
//     description: 'UUID of the airline operating the flight',
//     example: '550e8400-e29b-41d4-a716-446655440003',
//   })
//   @IsUUID()
//   airlineId: string;

//   @ApiProperty({
//     description: 'Flight status',
//     example: 'scheduled',
//     required: false,
//   })
//   @IsOptional()
//   @IsString()
//   status?: string;
// }

export class CreateFlightDto {
  @ApiProperty({
    description: 'UUID of the airplane',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  airplaneId: string;

  @ApiProperty({
    description: 'Flight duration in minutes',
    example: 240,
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: 'UUID of the departure airport',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  departureAirportId: string;

  @ApiProperty({
    description: 'UUID of the arrival airport',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  @IsUUID()
  arrivalAirportId: string;

  @ApiProperty({
    description: 'Terminal number or identifier',
    example: '1',
  })
  @IsString()
  terminal: string;

  @ApiProperty({
    description: 'Gate number or identifier',
    example: 'A12',
  })
  @IsString()
  gate: string;

  @ApiProperty({
    description: 'UUID of the airline operating the flight',
    example: '550e8400-e29b-41d4-a716-446655440003',
  })
  @IsUUID()
  airlineId: string;
}
