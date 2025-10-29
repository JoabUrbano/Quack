import { IsNumber } from "class-validator";

export class RandomNumbersDto{
    @IsNumber()
    min: number

    @IsNumber()
    max: number
}