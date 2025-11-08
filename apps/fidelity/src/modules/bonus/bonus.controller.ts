import { Body, Controller, Post } from '@nestjs/common';
import { CreateBonusUsecase } from '@fidelity/modules/bonus/usecases/createBonus.usecase';
import { CreateBonusDto } from '@fidelity/modules/bonus/dtos/createBonusDtos';
import { FailStateRequest04 } from '@app/shared/states/failStateRequest04';

@Controller('bonus')
export class BonusController {
  constructor(
    private readonly createBonusUsecase: CreateBonusUsecase,
    public failStateRequest04: FailStateRequest04
  ) {}

  @Post()
  async getBonus(@Body() body: CreateBonusDto) {
    this.failStateRequest04.probability()
    console.log(this.failStateRequest04.request04State)
    if(this.failStateRequest04.request04State == true) {
      while(1) {
        let a = 5
      }
    }
    await this.createBonusUsecase.execute(body);

    return 'Bonus criado com sucesso!';
  }
}
