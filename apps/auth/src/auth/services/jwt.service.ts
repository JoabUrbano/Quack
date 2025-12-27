import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

import { v4 as uuidv4 } from 'uuid';

export interface TokenPayload {
  sub: string;
  email: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.configService.get<string>('JWT_SECRET'), {
      expiresIn: this.configService.get<string>('JWT_EXPIRATION', '15m'),
      issuer: this.configService.get<string>('JWT_ISSUER', 'auth-service'),
    } as any);
  }

  generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(
      {
        ...payload,
        jti: this.generateJti(), // Fix the error caused by race condition where multiple refresh tokens are generated at the same time
      },
      this.configService.get<string>('JWT_REFRESH_SECRET'),
      {
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_EXPIRATION',
          '7d',
        ),
      } as any,
    );
  }

  private generateJti(): string {
    return uuidv4();
  }

  verifyAccessToken(token: string): TokenPayload {
    try {
      return jwt.verify(
        token,
        this.configService.get<string>('JWT_SECRET'),
      ) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  verifyRefreshToken(token: string): TokenPayload {
    try {
      return jwt.verify(
        token,
        this.configService.get<string>('JWT_REFRESH_SECRET'),
      ) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  decodeToken(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload;
    } catch (error) {
      return null;
    }
  }
}
