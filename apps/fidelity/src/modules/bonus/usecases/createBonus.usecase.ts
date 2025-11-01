import { Injectable } from "@nestjs/common";
import { CreateBonusDto } from "@fidelity/modules/bonus/dtos/createBonusDtos";
import { BonusRepository } from "@fidelity/domains/repositories/bonus.repository";

@Injectable()
export class CreateBonusUsecase {
    constructor(private readonly bonusRepository: BonusRepository) {
    }
    
    async execute(body: CreateBonusDto): Promise<string> {
        return await this.bonusRepository.createBonus(body);
    }
}