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
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { AuthService } from '@auth/auth/auth.service';
import { RegisterDTO, LoginDTO } from '@auth/auth/dtos';
import { Response } from 'express';
import { RefreshToken } from '@auth/decorators/refresh-token.decorator';
import { AccessToken } from '@auth/decorators/access-token.decorator';
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard"

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({ description: 'User registered successfully' })
  @ApiBadRequestResponse({ description: 'Invalid registration data' })
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({
    description: 'Login successful, tokens set in cookies', headers: {
      'Set-Cookie': { description: 'accessToken and refreshToken cookies', schema: { type: 'string' } }
    }
  })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
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

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({ description: 'New access token generated' })
  @ApiUnauthorizedResponse({ description: 'Invalid or missing refresh token' })
  @ApiCookieAuth('refreshToken')
  @Post('refresh')
  async refresh(@RefreshToken() refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    return this.authService.refreshAccessToken(refreshToken);
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiOkResponse({ description: 'Logout successful' })
  @ApiUnauthorizedResponse({ description: 'Invalid or missing token' })
  @ApiCookieAuth('accessToken')
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

  @ApiOperation({ summary: 'Validate token' })
  @ApiOkResponse({ description: 'Token is valid' })
  @ApiUnauthorizedResponse({ description: 'Invalid or missing token' })
  @Post('validate')
  async validate(@Body() body: { token: string }) {
    if (!body.token) {
      throw new UnauthorizedException('Token is required');
    }
    return this.authService.validateToken(body.token);
  }

  @ApiOperation({ summary: 'Get current user info' })
  @ApiOkResponse({ description: 'Current user information' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiCookieAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req: any) {
    return req.user;
  }

}
