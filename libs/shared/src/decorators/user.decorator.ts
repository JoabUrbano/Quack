import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export class UserEntity {
    sub: string;
    email: string;
    iat: number
    exp: number
}

export const User = createParamDecorator<UserEntity>((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    return request.user as UserEntity;
})