import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from '@imdtravel/auth/dto/create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
