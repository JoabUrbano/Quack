import { Body, Controller, Get } from "@nestjs/common"
import { GetRandomNumberExchange } from "./usecases/getRandomNumberExchange.usecase"
import { RandomNumbersDto } from "./dtos/randomNumbers.dto"

@Controller('random/exchange')
export class RandomExchangeController{
    constructor(
        private readonly getRandomNumberExchange: GetRandomNumberExchange
    ) {}
    
    @Get('exchange')
    getRandomExchangeDolar(@Body() numbersDto: RandomNumbersDto) {
        const number = this.getRandomNumberExchange.execute(+numbersDto.min, +numbersDto.max)
        return number
    }
}
