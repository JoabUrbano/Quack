import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGateway } from '@app/shared';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authGateway: AuthGateway) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

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