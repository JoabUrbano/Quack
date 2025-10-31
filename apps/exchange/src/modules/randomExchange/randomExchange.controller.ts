import { Body, Controller, Get, Query } from '@nestjs/common';
import { GetRandomNumberExchange } from './usecases/getRandomNumberExchange.usecase';
import { RandomNumbersDto } from './dtos/randomNumbers.dto';

@Controller('random/exchange')
export class RandomExchangeController {
  constructor(
    private readonly getRandomNumberExchange: GetRandomNumberExchange,
  ) {}

  @Get('convert')
  getRandomExchangeDolar(@Query() numbersDto: RandomNumbersDto) {
    const number = this.getRandomNumberExchange.execute();
    return number;
  }
}
