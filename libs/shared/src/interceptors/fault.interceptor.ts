import { FaultSimulation } from "@app/shared/decorators/faultSimulation.decorator";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class FaultInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest()

        const cf = request.body.cf || false;

        if (!cf) {
            return next.handle();
        }

        const fault = this.reflector.get(FaultSimulation, context.getHandler());

        if (!fault) {
            return next.handle();
        }

        return fault.execute().then(() => next.handle());

    }

}

