import { IsNumber, IsUUID } from "class-validator";

export class CreateBonusDto {
    @IsUUID()
    user: string;

    @IsNumber()
    bonus: number;
}
