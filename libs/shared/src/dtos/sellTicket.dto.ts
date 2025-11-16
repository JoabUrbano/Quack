import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsUUID } from 'class-validator';

export class SellTicketDto {
  @ApiProperty({ description: 'Flight number' })
  @IsNumber()
  flight: number;

  @ApiProperty({
    description: 'Day of the flight',
    type: String,
    format: 'date',
  })
  @IsDate()
  @Type(() => Date)
  day: Date;

  @ApiProperty({ description: 'Ticket final value' })
  @IsNumber()
  finalValue: number; // NOTE: Gibeon não especificou esse campo no documento, porém na minha cabeça faz sentido ter esse campo

  @ApiProperty({ description: 'User ID' })
  @IsUUID()
  userId: string; // NOTE: Gibeon não especificou esse campo no documento, porém na minha cabeça faz sentido ter esse campo

  @ApiProperty({
    description: 'Fault Tolerant',
    type: Boolean
  })
  @IsBoolean()
  ft: boolean;
}
