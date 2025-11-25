import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthGateway {
  constructor(private httpservice: HttpService) { }

  async validateToken({ accessToken, refreshToken }: { accessToken: string, refreshToken: string }): Promise<{
    "sub": string,
    "email": string,
    "iat": number,
    "exp": number

  }> {
    const res = this.httpservice.get('http://auth:3004/auth/me', {
      headers: {
        Cookie: `accessToken=${accessToken};refreshToken=${refreshToken}`,
      }
    });

    const data = await lastValueFrom(res);

    return data.data;
  }
}
