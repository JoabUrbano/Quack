import { Fault } from '@app/shared/faults/fault'
import { probabilityEvent } from '@app/shared/utils/probability';

export class TimeoutFault extends Fault {
    durationMs: number;
    probability: number;

    constructor(input: { durationMs: number; probability: number }) {
        super();

        this.durationMs = input.durationMs;
        this.probability = input.probability;
    }

    async execute(): Promise<void> {
        const event = probabilityEvent(this.probability);

        if (!event) return;

        return new Promise((resolve) => setTimeout(resolve, this.durationMs));

    }
}
