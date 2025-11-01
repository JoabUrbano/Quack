import { BonusRepository } from "@fidelity/domains/repositories/bonus.repository";
import { PrismaService } from "@fidelity/infra/database/prisma.service";
import { CreateBonusDto } from "@fidelity/modules/bonus/dtos/createBonusDtos";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaBonusRepository implements BonusRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async createBonus(body: CreateBonusDto): Promise<any> {
        try {
            const res = await this.prismaService.bonus.create({
                data: {
                    user: body.user,
                    value: body.bonus
                }
            })
            
            return "Bonus criado com sucesso!"
        } catch(e){
            return "Não foi possivel criar o bonus!"
        }
    }
}
