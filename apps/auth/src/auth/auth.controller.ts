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
import { RegisterDTO, LoginDTO } from '@auth/auth/auth.service';
import { JwtAuthGuard } from '@app/shared';
import { Response } from 'express';

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

  // @Post('refresh')
  // async refresh(@Body() body: { refreshToken: string }) {
  //   if (!body.refreshToken) {
  //     throw new UnauthorizedException('Refresh token is required');
  //   }
  //   return this.authService.refreshAccessToken(body.refreshToken);
  // }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    if (!body.refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }
    return this.authService.refreshAccessToken(body.refreshToken);
  }

  @Post('logout')
  async logout(@Request() req: any) {
    const token = this.extractToken(req);
    if (!token) {
      throw new UnauthorizedException('Token is required');
    }
    const payload = this.authService.validateToken(token);
    return this.authService.logout((await payload).sub);
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
}
