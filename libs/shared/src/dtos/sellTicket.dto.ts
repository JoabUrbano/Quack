import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsUUID } from 'class-validator';

export class SellTicketDto {
  @ApiProperty({ description: 'Flight schedule ID' })
  @IsUUID()
  flightScheduleId: string;

  @ApiProperty({ description: 'Ticket final value' })
  @IsNumber()
  finalValue: number; // NOTE: Gibeon não especificou esse campo no documento, porém na minha cabeça faz sentido ter esse campo

  @ApiProperty({ description: 'User ID' })
  @IsUUID()
  userId: string; // NOTE: Gibeon não especificou esse campo no documento, porém na minha cabeça faz sentido ter esse campo
}
