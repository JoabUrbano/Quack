import { PartialType } from '@nestjs/swagger';
import { CreateAirportDto } from './createAirport.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOneAirportDto extends PartialType(CreateAirportDto) {}
