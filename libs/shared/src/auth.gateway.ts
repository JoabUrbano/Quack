import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthGateway {
  constructor(private httpservice: HttpService, private configService: ConfigService,) { }

  async validateToken({ accessToken, refreshToken }: { accessToken: string, refreshToken: string }): Promise<{
    "sub": string,
    "email": string,
    "iat": number,
    "exp": number

  }> {
    const res = this.httpservice.get(`${this.configService.get<string>('AUTH_URL')}/me`, {
      headers: {
        Cookie: `accessToken=${accessToken};refreshToken=${refreshToken}`,
      }
    });


    const data = await lastValueFrom(res);

    return data.data;
  }
}
