import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAirlineDto {
  @ApiProperty({
    description: 'Name of the airline',
    example: 'TAP Air Portugal',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Country where the airline is based',
    example: 'Portugal',
  })
  @IsString()
  country: string;
}
