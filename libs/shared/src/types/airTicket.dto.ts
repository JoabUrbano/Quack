import { ApiProperty } from '@nestjs/swagger';

export class AirTicketDto {
  @ApiProperty({
    description: 'Unique identifier for the flight',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Flight value in cents',
    example: 10000,
  })
  finalValue: number;

  @ApiProperty({
    description: 'Seat number assigned to the ticket',
    example: 12,
  })
  seatNumber: number;

  @ApiProperty({
    description: 'Identifier of the flight schedule associated with the ticket',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  flightScheduleId: string;

  @ApiProperty({
    description: 'Identifier of the user who purchased the ticket',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;

  @ApiProperty({
    description: 'Date when the ticket was purchased',
    example: '2023-10-01T12:00:00Z',
  })
  purchaseDate: Date;
}
