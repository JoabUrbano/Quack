import { Controller, Get, Query } from '@nestjs/common';
import { GetRandomNumberExchange } from './usecases/getRandomNumberExchange.usecase';
import { RandomNumbersDto } from './dtos/randomNumbers.dto';
import { FailStateRequest02 } from '@app/shared/states/failStateRequest02';
import { boolean } from 'joi';

@Controller('random/exchange')
export class RandomExchangeController {
  constructor(
    private readonly getRandomNumberExchange: GetRandomNumberExchange,
    public readonly failStateRequest02: FailStateRequest02,
    private readonly lastTenNumbers: number[] = []
  ) { }

  @Get('convert')
  getRandomExchangeDolar(@Query() numbersDto: RandomNumbersDto) {
    if (numbersDto.ft) {
      this.failStateRequest02.probability()

      if (this.failStateRequest02.request02State) {
        //var id é um placeholder para teste, será substituído pela boolean ft, de buyticket.dto
        return -1;
      }
    }

    const number = this.getRandomNumberExchange.execute();

    this.lastTenNumbers.push(number);
    if (this.lastTenNumbers.length > 10) {
      this.lastTenNumbers.shift();
    }

    return number;
  }
}
