import { Module } from "@nestjs/common";
import { RandomExchangeController } from "./randomExchange.controller";
import { GetRandomNumberExchange } from "./usecases/getRandomNumberExchange.usecase";

@Module({
    imports: [],
    controllers: [RandomExchangeController],
    providers: [GetRandomNumberExchange]
})

export class RandomExchangeModule {}
