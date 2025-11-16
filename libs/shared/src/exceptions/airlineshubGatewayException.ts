export class AirlinesHubExceptionTimeoutError extends Error {
    constructor() {
        super("Requisição ao AirlinesHub demorou mais do que o esperado");
        this.name = ("AirlinesHubExceptionTimeoutError");
    }
}
