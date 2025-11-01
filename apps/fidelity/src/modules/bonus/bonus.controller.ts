import { Body, Controller, Post } from '@nestjs/common';
import { CreateBonusUsecase } from '@fidelity/modules/bonus/usecases/createBonus.usecase';
import { CreateBonusDto } from '@fidelity/modules/bonus/dtos/createBonusDtos';

@Controller('bonus')
export class BonusController {
  constructor(private readonly createBonusUsecase: CreateBonusUsecase) {}

  @Post()
  async getBonus(@Body() body: CreateBonusDto) {
    await this.createBonusUsecase.execute(body);

    return 'Bonus criado com sucesso!';
  }
}
