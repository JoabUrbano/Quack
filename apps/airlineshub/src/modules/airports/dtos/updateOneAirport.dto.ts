import { PartialType } from '@nestjs/mapped-types';
import { CreateAirportDto } from './createAirport.dto';

export class UpdateOneAirportDto extends PartialType(CreateAirportDto) {}
