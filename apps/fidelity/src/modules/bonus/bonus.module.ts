import { Global, Module } from '@nestjs/common';
import { BonusController } from '@fidelity/modules/bonus/bonus.controller';
import { CreateBonusUsecase } from '@fidelity/modules/bonus/usecases/createBonus.usecase';
import { PrismaBonusRepository } from '@fidelity/infra/repositories/bonus.repository';
import { BonusRepository } from '@fidelity/domains/repositories/bonus.repository';
import { PrismaService } from '@fidelity/infra/database/prisma.service';
import { SharedModule } from '@app/shared';

@Global()
@Module({
    imports: [SharedModule],
    controllers: [BonusController],
    providers: [
        CreateBonusUsecase,
        {
            provide: BonusRepository,
            useClass: PrismaBonusRepository
        },
        PrismaService
    ],
    exports: [CreateBonusUsecase]
})

export class BonusModule { }