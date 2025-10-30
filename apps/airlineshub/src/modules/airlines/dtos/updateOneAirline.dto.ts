import { PartialType } from '@nestjs/swagger';
import { CreateAirlineDto } from './createAirline.dto';

export class UpdateOneAirlineDto extends PartialType(CreateAirlineDto) {}
