import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationFilterDto {
  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    const val = parseInt(value, 10);
    return isNaN(val) ? undefined : val;
  })
  @IsNumber()
  @Min(1)
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    const val = parseInt(value, 10);
    return isNaN(val) ? undefined : val;
  })
  @IsNumber()
  @Min(1)
  limit: number;
}
