import { IsNumber, IsOptional, Min } from 'class-validator';

import { PaginationFilterDto } from '@airlineshub/common/dtos/paginationFilter.dto';

export class FindManyFlightsDto extends PaginationFilterDto {}
