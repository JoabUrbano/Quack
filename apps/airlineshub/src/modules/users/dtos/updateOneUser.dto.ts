import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './createUser.dto';

export class UpdateOneUserDto extends PartialType(CreateUserDto) {}
