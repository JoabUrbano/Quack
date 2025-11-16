import { Controller, Get, Query } from '@nestjs/common';
import { GetRandomNumberExchange } from './usecases/getRandomNumberExchange.usecase';
import { RandomNumbersDto } from './dtos/randomNumbers.dto';
import { FailStateRequest02 } from '@app/shared/states/failStateRequest02';

@Controller('random/exchange')
export class RandomExchangeController {
  constructor(
    private readonly getRandomNumberExchange: GetRandomNumberExchange,
    public readonly failStateRequest02: FailStateRequest02
  ) { }

  @Get('convert')
  getRandomExchangeDolar(@Query() numbersDto: RandomNumbersDto) {
    const { ft } = numbersDto;

    if (ft) {
      this.failStateRequest02.probability()

      if (this.failStateRequest02.request02State) {
        return -1;
      }
    }

    const number = this.getRandomNumberExchange.execute();

    return number;
  }
}
