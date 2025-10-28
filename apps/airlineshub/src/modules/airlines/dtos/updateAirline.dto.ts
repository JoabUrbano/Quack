import { PartialType } from '@nestjs/mapped-types';
import { CreateAirlineDto } from '@nestjs/mapped-types';

export class UpdateOneAirlineDto extends PartialType(CreateAirlineDto){}
