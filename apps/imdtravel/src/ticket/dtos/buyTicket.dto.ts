import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsOptional, IsUUID } from 'class-validator';

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
  userId: string;

  @ApiProperty({
    description: 'Fault Tolerant',
    type: Boolean
  })
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value; // Se já for boolean
    if (typeof value === 'string') return value.toLowerCase() === 'true'; // Se for string
    return Boolean(value); // Converte qualquer outro tipo
  })
  @IsOptional()
  @IsBoolean()
  ft?: boolean;
}
