import { IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAirTicketDto {
  @ApiProperty({
    description: 'Seat number for the ticket',
    example: 12,
  })
  @IsInt()
  @Min(1)
  seatNumber: number;

  @ApiProperty({
    description: 'Flight schedule ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  flightScheduleId: string;

  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Final value of the ticket in cents',
    example: 50000,
  })
  @IsInt()
  @Min(1)
  finalValue: number;
}
