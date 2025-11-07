import { Injectable } from "@nestjs/common";

@Injectable()
export class FailStateRequest01{
    public request01State: Boolean = false;
    constructor() {}

    probability() {
        const probability = Math.floor(Math.random() * (10 - 5) + 5);
        console.log(probability)
        if(probability == 5) {
            this.request01State = true
        }
        else {
            this.request01State = false
        }
    }
}
