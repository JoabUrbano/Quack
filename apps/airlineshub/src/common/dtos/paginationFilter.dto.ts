import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationFilterDto {
  @IsOptional()
  @Transform(({ value }) => {
    const val = parseInt(value, 10);
    return isNaN(val) ? undefined : val;
  })
  @IsNumber()
  @Min(1)
  page: number;

  @IsOptional()
  @Transform(({ value }) => {
    const val = parseInt(value, 10);
    return isNaN(val) ? undefined : val;
  })
  @IsNumber()
  @Min(1)
  limit: number;
}
