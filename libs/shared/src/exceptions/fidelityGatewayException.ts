export class FidelityExceptionTimeoutError extends Error {
    constructor() {
        super("Requisição ao Fidelity demorou mais do que o esperado");
        this.name = ("FidelityExceptionTimeoutError");
    }
}
