import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from './jwt.service';
import { TokenPayload } from './jwt.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async storeRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const expirationTime = this.configService.get<string>(
      'JWT_REFRESH_EXPIRATION',
      '7d',
    );

    const expiresAtMs = this.parseExpirationToMs(expirationTime);
    const expiresAt = new Date(Date.now() + expiresAtMs);

    await this.prismaService.refreshToken.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt,
      },
    });
  }

  async validateRefreshToken(
    userId: string,
    token: string,
  ): Promise<boolean> {
    const storedToken = await this.prismaService.refreshToken.findUnique({
      where: { token },
    });

    if (!storedToken) {
      return false;
    }

    if (storedToken.userId !== userId) {
      return false;
    }

    if (storedToken.revokedAt !== null) {
      return false;
    }

    if (storedToken.expiresAt < new Date()) {
      return false;
    }

    return true;
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await this.prismaService.refreshToken.update({
      where: { token },
      data: { revokedAt: new Date() },
    });
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    await this.prismaService.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = this.jwtService.verifyRefreshToken(refreshToken);

      const isValid = await this.validateRefreshToken(
        payload.sub,
        refreshToken,
      );

      if (!isValid) {
        throw new BadRequestException('Refresh token is invalid or expired');
      }

      const newAccessToken = this.jwtService.generateAccessToken(payload);
      const newRefreshToken = this.jwtService.generateRefreshToken(payload);

      await this.revokeRefreshToken(refreshToken);
      await this.storeRefreshToken(payload.sub, newRefreshToken);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new BadRequestException('Failed to refresh token');
    }
  }

  private parseExpirationToMs(expiration: string): number {
    const match = expiration.match(/^(\d+)([smhd])$/);
    if (!match) {
      return 7 * 24 * 60 * 60 * 1000; // Default 7 days
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 's':
        return value * 1000;
      case 'm':
        return value * 60 * 1000;
      case 'h':
        return value * 60 * 60 * 1000;
      case 'd':
        return value * 24 * 60 * 60 * 1000;
      default:
        return 7 * 24 * 60 * 60 * 1000;
    }
  }
}
