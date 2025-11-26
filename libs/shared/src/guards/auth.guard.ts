import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGateway } from '@app/shared';
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "@app/shared/decorators";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authGateway: AuthGateway, private reflector: Reflector) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if (isPublic) {
            return true;
        }

        const token = request.cookies?.accessToken;

        if (!token) {
            throw new UnauthorizedException('Token not found in cookies');
        }

        try {
            const res = await this.authGateway.validateToken({
                accessToken: request.cookies?.accessToken,
                refreshToken: request.cookies?.refreshToken,
            });

            request.user = res;

            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}