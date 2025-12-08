import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetFlightDto {
  @ApiProperty({
    description: 'Flight number',
    example: 123,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  flight: number;

  @ApiProperty({
    description: 'Flight date',
    example: '2025-11-15',
  })
  @IsDate()
  @Type(() => Date)
  day: Date;

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
  cf?: boolean;
}

