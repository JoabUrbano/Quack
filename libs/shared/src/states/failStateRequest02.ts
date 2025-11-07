import { Injectable } from "@nestjs/common";

@Injectable()
export class FailStateRequest02{
    constructor(
        public request02State: Boolean
    ) {
        request02State = false
    }

    probability() {
        setTimeout(() => {
            const probability = Math.random() * (10 - 1) + 1;
            if(probability == 10) {
                this.request02State = true
            }
        }, 5000)
    }
}
