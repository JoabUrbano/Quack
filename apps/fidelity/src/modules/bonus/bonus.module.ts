import { Module } from '@nestjs/common';
import { BonusController } from '@fidelity/modules/bonus/bonus.controller';
import { CreateBonusUsecase } from '@fidelity/modules/bonus/usecases/createBonus.usecase';
import { PrismaBonusRepository } from '@fidelity/infra/repositories/bonus.repository';
import { BonusRepository } from '@fidelity/domains/repositories/bonus.repository';

@Module({
    imports: [],
    controllers: [BonusController],
    providers: [
        CreateBonusUsecase,
        {
            provide: BonusRepository,
            useClass: PrismaBonusRepository
        }
    ],
    exports: [CreateBonusUsecase]
})

export class BonusModule {}