import { Request } from 'express';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@app/shared/decorators';

export interface TokenPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private configService: ConfigService, private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true;
    }

    const {
      accessToken,
      refreshToken
    } = this.extractTokenFromCookies(request);



    if (!accessToken) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = jwt.verify(
        accessToken,
        this.configService.get<string>('JWT_SECRET'),
      ) as TokenPayload;

      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractToken(request: any): string | null {
    const authHeader = request.headers?.authorization;
    if (!authHeader) {
      return null;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    return parts[1];
  }

  private extractTokenFromCookies(req: Request) {
    const accessTokenCookie = req.cookies?.accessToken;

    const refreshTokenCookie = req.cookies?.refreshToken;

    return {
      accessToken: accessTokenCookie || null,
      refreshToken: refreshTokenCookie || null,
    }
  };
}
