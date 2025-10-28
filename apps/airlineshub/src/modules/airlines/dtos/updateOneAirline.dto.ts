import { PartialType } from '@nestjs/mapped-types';
import { CreateAirlineDto } from './createAirline.dto';
import { IsString } from 'class-validator';

export class UpdateOneAirlineDto extends PartialType(CreateAirlineDto){}
