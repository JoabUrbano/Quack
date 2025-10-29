import { PartialType } from '@nestjs/mapped-types';
import { CreateAirplaneDto } from './createAirplane.dto';

export class UpdateOneAirplaneDto extends PartialType(CreateAirplaneDto) {}
