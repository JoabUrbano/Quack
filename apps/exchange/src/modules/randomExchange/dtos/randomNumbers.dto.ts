import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";

export class RandomNumbersDto {
    @ApiProperty({
        description: 'Minimum number',
        example: 1,
    })
    @IsNumber()
    min: number

    @ApiProperty({
        description: 'Maximum number',
        example: 6,
    })
    @IsNumber()
    max: number

    @ApiProperty({
        description: 'Fault Tolerant',
        type: Boolean
    })
    @IsBoolean()
    ft: boolean;
}