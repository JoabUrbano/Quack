import { PartialType } from '@nestjs/swagger';
import { CreateAirplaneDto } from './createAirplane.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOneAirplaneDto extends PartialType(CreateAirplaneDto) {}
