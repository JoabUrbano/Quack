import { UserCreatedEventDto } from '@app/shared/events';
import { PartialType } from '@nestjs/swagger';

export class UpdateOneUserDto extends PartialType(UserCreatedEventDto) {}
