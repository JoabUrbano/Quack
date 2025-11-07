import { Module } from "@nestjs/common";
import { RandomExchangeController } from "./randomExchange.controller";
import { GetRandomNumberExchange } from "./usecases/getRandomNumberExchange.usecase";
import { SharedModule } from "@app/shared";

@Module({
    imports: [SharedModule],
    controllers: [RandomExchangeController],
    providers: [GetRandomNumberExchange]
})

export class RandomExchangeModule {}
