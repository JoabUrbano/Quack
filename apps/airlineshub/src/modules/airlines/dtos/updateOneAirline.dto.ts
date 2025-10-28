import { PartialType } from '@nestjs/mapped-types';
import { CreateAirlineDto } from './createAirline.dto';


export class UpdateOneAirlineDto extends PartialType(CreateAirlineDto){}
