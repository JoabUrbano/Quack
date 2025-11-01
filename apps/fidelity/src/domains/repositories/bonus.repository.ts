import { CreateBonusDto } from "@fidelity/modules/bonus/dtos/createBonusDtos";

export abstract class BonusRepository {
    abstract createBonus(body: CreateBonusDto): Promise<any>
}