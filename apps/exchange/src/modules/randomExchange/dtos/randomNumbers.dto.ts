import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class RandomNumbersDto {
    @ApiProperty({
        description: 'Fault Tolerant',
        type: Boolean
    })
    @Transform(({ value }) => {
        if (typeof value === 'boolean') return value; // Se já for boolean
        if (typeof value === 'string') return value.toLowerCase() === 'true'; // Se for string
        return Boolean(value); // Converte qualquer outro tipo
    })
    @IsOptional()
    @IsBoolean()
    cf?: boolean;
}