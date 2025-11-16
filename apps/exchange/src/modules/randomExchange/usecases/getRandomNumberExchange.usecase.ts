import { Injectable } from "@nestjs/common";

@Injectable()
export class GetRandomNumberExchange {
    private readonly min = 5
    private readonly max = 6


    execute(): number {
        const number = Math.random() * (this.max - this.min) + this.min;
        return number
    }
}
