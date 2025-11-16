import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber } from 'class-validator';
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
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  ft: boolean;
}

