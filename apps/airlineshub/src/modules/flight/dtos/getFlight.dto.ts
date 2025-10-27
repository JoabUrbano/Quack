import { Transform, Type } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";

export class GetFlightDto {

    @IsNumber()
    flight: number;

    @IsDate()
    @Type(() => Date)
    day: Date;
}