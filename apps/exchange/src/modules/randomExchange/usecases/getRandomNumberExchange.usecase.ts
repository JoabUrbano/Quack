import { Injectable } from "@nestjs/common";

@Injectable()
export class GetRandomNumberExchange{
    
    execute(min: number, max: number) {
        const number = Math.floor(Math.random() * (max - min + 1)) + min
        return number
    }
}
