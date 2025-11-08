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
  ) {}

  @Get('convert')
  getRandomExchangeDolar(@Query() numbersDto: RandomNumbersDto) {
    this.failStateRequest02.probability()
    if(this.failStateRequest02.request02State) {
      //var id é um placeholder para teste, será substituído pela boolean ft, de buyticket.dto
      var id = 0
      if (id == 1){
        if (this.lastTenNumbers.length === 0){
          return { message: 'No previous values yet'};
        }
        const average = this.lastTenNumbers.reduce((sum, n) => sum + n, 0) / this.lastTenNumbers.length;
        return {average};
        
      }
      else{
        return -1;
      }
    }
    const number = this.getRandomNumberExchange.execute();

    this.lastTenNumbers.push(number);
    if(this.lastTenNumbers.length > 10){
      this.lastTenNumbers.shift();
    }

    return number;
  }
}
