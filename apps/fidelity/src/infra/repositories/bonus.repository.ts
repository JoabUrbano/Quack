import { BonusRepository } from "@fidelity/domains/repositories/Bonus.repository";
import { PrismaService } from "@fidelity/infra/database/prisma.service";

export class PrismaBonusRepository implements BonusRepository {
    async createBonus(): Promise<any> {
        await PrismaService
        return "ola"
    }
    
}