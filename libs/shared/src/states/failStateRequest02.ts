import { Injectable } from "@nestjs/common";
import { probabilityEvent } from "../utils/probability";

@Injectable()
export class FailStateRequest02{
     public request02State: boolean = false
    constructor() {}

    probability() {
        const event = probabilityEvent(10);
        
        if(event) {
            this.request02State = true
        }
        setTimeout(() => {
            this.request02State = false
        }, 5000)
    }
}
