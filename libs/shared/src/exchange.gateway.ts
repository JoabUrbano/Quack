import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ExchangeGateway {
    constructor(private httpservice: HttpService) {}

    async getRandomNumberExchange(): Promise<any> {
        const response = this.httpservice.get(
            `${process.env.EXCHANGE_URL}/random/exchange/convert`,
            {
                params: {
                "min": 5,
                "max": 6
            }
            }

        )
        const res = await lastValueFrom(response)
        return res.data
    }

}