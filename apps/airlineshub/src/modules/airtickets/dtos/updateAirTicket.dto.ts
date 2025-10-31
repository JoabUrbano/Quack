import { IsString, IsInt, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAirTicketDto {
  @ApiProperty({
    description: 'Seat number for the ticket',
    example: 12,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  seatNumber?: number;

  @ApiProperty({
    description: 'Final value of the ticket in cents',
    example: 50000,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  finalValue?: number;
}
