import { Injectable } from "@nestjs/common";

@Injectable()
export class GetRandomNumberExchange{
    private readonly min = 5
    private readonly max = 6

    
    execute(): number {
        const number = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
        return number
    }
}
