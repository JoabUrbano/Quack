export abstract class Fault {
    abstract durationMs: number;
    abstract probability: number;

    abstract execute(): Promise<void>;
}