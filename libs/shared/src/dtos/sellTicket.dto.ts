import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsUUID } from 'class-validator';

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

  // @ApiProperty({ description: 'User ID' })
  // @IsUUID()
  // userId: string; // NOTE: Gibeon não especificou esse campo no documento, porém na minha cabeça faz sentido ter esse campo

  @ApiProperty({
    description: 'Cause Fault',
    type: Boolean
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value; // Se já for boolean
    if (typeof value === 'string') return value.toLowerCase() === 'true'; // Se for string
    return Boolean(value); // Converte qualquer outro tipo
  })
  @IsBoolean()
  cf?: boolean;

  @ApiProperty({
    description: 'Fault Tolerant',
    type: Boolean
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value; // Se já for boolean
    if (typeof value === 'string') return value.toLowerCase() === 'true'; // Se for string
    return Boolean(value); // Converte qualquer outro tipo
  })
  @IsBoolean()
  ft?: boolean;


}
