import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsUUID } from 'class-validator';

export class BuyTicketDto {
  @ApiProperty({ description: 'Flight number' })
  @IsInt()
  flight: number;

  @ApiProperty({
    description: 'Day of the flight',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @Type(() => Date)
  day: Date;

  @ApiProperty({ description: 'User ID' })
  @IsUUID()
  userId: number;
}
