import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from '@auth/auth/auth.service';
import { RegisterDTO, LoginDTO } from '@auth/auth/dtos';
import { JwtAuthGuard } from '@app/shared';
import { Response } from 'express';
import { RefreshToken } from '@auth/decorators/refresh-token.decorator';
import { AccessToken } from '@auth/decorators/access-token.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO, @Res({
    passthrough: true,
  }) res: Response) {
    const token = await this.authService.login(loginDTO);

    res.cookie('accessToken', token.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
    });
    res.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
    });

    return { message: 'Login successful' };
  }

  @Post('refresh')
  async refresh(@RefreshToken() refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('logout')
  async logout(@AccessToken() accessToken: string, @Res({
    passthrough: true,
  }) res: Response) {
    if (!accessToken) {
      throw new UnauthorizedException('Token is required');
    }

    const payload = await this.authService.validateToken(accessToken);

    await this.authService.logout(payload.sub);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return { message: 'Logout successful' };
  }

  @Post('validate')
  async validate(@Body() body: { token: string }) {
    if (!body.token) {
      throw new UnauthorizedException('Token is required');
    }
    return this.authService.validateToken(body.token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req: any) {
    return req.user;
  }

}
