import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    console.log('DATABASE_URL:', databaseUrl);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
